import { Request,Response,NextFunction } from "express"
import services from "../maps/services";
import rideService from "../maps/ride.service";

export const getcordinates=async(req:Request,resp:Response,next:NextFunction)=>{
    const address=req.body.address;
    try{
        const coordinates=await services.getCoordinatesFromAddress(address);
        resp.status(200).json(coordinates);
    }
    catch(e){
        resp.status(404).json({message:"cordinates not found"})
    }
}

export const getDistanceTime=async (req:Request,resp:Response,next:NextFunction)=>{
    const {origin,destination}=req.body;
    try{
        const time=await services.getDistanceTime(origin,destination);
        resp.status(200).json(time)
    }
    catch(e){
        resp.status(500).json({message:(e as Error).message})
    }
}

export const getAutoSuggestions = async (req: Request, resp: Response, next: NextFunction) => {
    const input = req.body.input;
    if (!input) {
         resp.status(400).json({ message: "Input is required for auto-suggestions." });
         return;
    }
    try {
        const suggestions = await services.getAutoSuggestions(input);
        resp.status(200).json(suggestions);
    } catch (e) {
        resp.status(500).json({ message: "Internal server error" });
    }
};

export const getFare = async (req: Request, resp: Response, next: NextFunction) => {
    const { origin, destination } = req.body;
    try {
        const fare = await rideService.getFare(origin, destination);
        resp.status(200).json(fare);
    } catch (e) {
        resp.status(500).json({ message: (e as Error).message });
    }
};