import services, { distanceTimeInterface } from "./services";
import { RideModel } from '../db/ride.model';
import crypto from "crypto";

async function getFare(pickup: string, destination: string) {
    if (!pickup || !destination) {
        throw new Error("pickup and destination are required");
    }

    const distanceTime: distanceTimeInterface = await services.getDistanceTime(pickup, destination);

    const baseFare = {
        car: 50,
        auto: 30,
        motorcycle: 20,
    };

    const perKmRate = {
        car: 10,
        auto: 7,
        motorcycle: 5,
    };

    const perMinuteRate = {
        car: 2,
        auto: 1.5,
        motorcycle: 1,
    };

    const fare = {
        car: baseFare.car + (distanceTime.distance.value / 1000) * perKmRate.car + (distanceTime.duration.value / 60) * perMinuteRate.car,
        auto: baseFare.auto + (distanceTime.distance.value / 1000) * perKmRate.auto + (distanceTime.duration.value / 60) * perMinuteRate.auto,
        motorcycle: baseFare.motorcycle + (distanceTime.distance.value / 1000) * perKmRate.motorcycle + (distanceTime.duration.value / 60) * perMinuteRate.motorcycle,
    };

    return fare;
}
function generateOtp(): string {
    const otp = crypto.randomInt(1000, 10000); // Generates a random number between 1000 and 9999
    return otp.toString();
}
async function createRide(user: string, pickup: string, destination: string, vehicleType: "car" | "auto" | "motorcycle", fare: string) {
    if (!user || !pickup || !destination || !vehicleType || !fare) {
        throw new Error("pickup, destination, and vehicleType are required");
    }

    const rideData = {
        user,
        pickup,
        destination,
        vehicleType,
        otp: generateOtp(),
        fare,
        status: "pending",
    };

    const ride = await RideModel.create(rideData);
    return ride;
}
const confirmRide = async (rideId: string, captain: any) => {
    
    if (!rideId) {
        throw new Error('Ride id is required');
    }

        await RideModel.findOneAndUpdate(
            { _id: rideId },
            { status: 'accepted', captain: captain._id },
            { new: true } // Ensures the updated document is returned
        );
   
    const ride = await RideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;

}

export default {
    createRide,
    getFare,
    confirmRide
};