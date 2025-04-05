import { Request,Response,NextFunction } from "express";
import rideService from "../maps/ride.service";
import services from "../maps/services";
import { sendMessageToSocketId } from "../socket";
import { RideModel } from "../db/ride.model";

const createRide = async (req: Request, resp: Response, next: NextFunction) => {
    const { _id } = req.body.user;
    const { destination, pickup, vehicleType, fare } = req.body;
    try {
        const ride = await rideService.createRide(_id, destination, pickup, vehicleType, fare);
        const pickupCoordinate = await services.getCoordinatesFromAddress(pickup);
        console.log(pickupCoordinate);
        const captainInRadius = await services.findNearestCaptain(pickupCoordinate.lat, pickupCoordinate.lng, 10);
        const rideWithUser = await RideModel.findOne({ _id: ride._id }).populate({ path: "user", strictPopulate: false });
        console.log(rideWithUser);

        captainInRadius.map((captain) => {
            sendMessageToSocketId(captain.socketId, {
                event: "new-ride",
                data: rideWithUser,
            });
        });
        resp.status(200).json(ride);
    } catch (error) {
        resp.status(400).json({ message: (error as Error).message });
    }
};

const confirmRide = async (req: Request, resp: Response, next: NextFunction) => {
    const { rideId } = req.body;
    const { captain } = req.body;
    if (!rideId) {
        resp.status(400).json({ message: "rideId not found" });
        return;
    }
    try {
        const ride :any= await rideService.confirmRide(rideId, captain._id);
        console.log("rideObject", ride);
        if (ride.user && ride.user.socketId) {
            sendMessageToSocketId(ride.user.socketId, {
                event: "ride-confirmed",
                data: ride,
            });
        } else {
            console.error("User or socketId not found in ride");
        }
        resp.status(200).json(ride);
    } catch (e) {
        resp.status(400).json({ message: (e as Error).message });
    }
};

const startRide = async (req: Request, resp: Response, next: NextFunction) => {
    const { rideId } = req.body;
    const { captain } = req.body;
    const {otp}=req.body;
    if (!rideId||!otp) {
        resp.status(400).json({ message: "rideId not found or Otp not found" });
        return;
    }
    try {
        const ride:any=await RideModel.findOne({_id:rideId}).populate({path:"user",strictPopulate:false}).populate({path:"captain",strictPopulate:false}).select("+otp");
        if(!ride){
            resp.status(400).json({message:"ride not found"});
            return;
        } 
        if(ride.otp!=otp){
            resp.status(400).json({message:"invalid otp"});
            return;
        }
        await RideModel.findByIdAndUpdate(rideId,{
            status:"ongoing"
        })
        sendMessageToSocketId(ride.user.socketId,{
            event:"ride-started",
            data:ride
        })
        resp.status(200).json(ride);
    }
    catch (e) {
        resp.status(400).json({ message: (e as Error).message });
    }
};

const endUserRide = async (req: Request, resp: Response, next: NextFunction) => {
    const { rideId } = req.body;
    if (!rideId) {
        resp.status(400).json({ message: "rideId not found" });
        return;
    }
    try {
        const ride: any = await RideModel.findOne({ _id: rideId }).populate("user").populate("captain");
        if (!ride) {
            resp.status(400).json({ message: "Ride not found" });
            return;
        }
        await RideModel.findByIdAndUpdate(rideId, { status: "completed" });
        if (ride.user?.socketId) {
            sendMessageToSocketId(ride.user.socketId, {
                event: "end-ride",
                data: ride,
            });
        }
        if (ride.captain?.socketId) {
            sendMessageToSocketId(ride.captain.socketId, {
                event: "end-ride",
                data: ride,
            });
        }
        resp.status(200).json({ message: "Ride ended successfully" });
    } catch (error) {
        resp.status(400).json({ message: (error as Error).message });
    }
};

const endCaptainRide = async (req: Request, resp: Response, next: NextFunction) => {
    const { rideId } = req.body;
    if (!rideId) {
        resp.status(400).json({ message: "rideId not found" });
        return;
    }
    
    try {
        const ride: any = await RideModel.findOne({ _id: rideId }).populate("user").populate("captain");
        if (!ride) {
            resp.status(400).json({ message: "Ride not found" });
            return;
        }
        if (ride.status !== "ongoing") {
            resp.status(400).json({ message: "invalid Ride action" });
            return;
        }
        await RideModel.findByIdAndUpdate(rideId, { status: "completed" });
        if (ride.user?.socketId) {
            sendMessageToSocketId(ride.user.socketId, {
                event: "end-ride",
                data: ride,
            });
        }
        if (ride.captain?.socketId) {
            sendMessageToSocketId(ride.captain.socketId, {
                event: "end-ride",
                data: ride,
            });
        }
        resp.status(200).json({ message: "Ride ended successfully" });
    } catch (error) {
        resp.status(400).json({ message: (error as Error).message });
    }
};

export default {
    createRide,
    confirmRide,
    startRide,
    endUserRide,
    endCaptainRide,
};