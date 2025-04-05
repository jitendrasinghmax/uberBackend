"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = __importDefault(require("./services"));
const ride_model_1 = require("../db/ride.model");
const crypto_1 = __importDefault(require("crypto"));
function getFare(pickup, destination) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!pickup || !destination) {
            throw new Error("pickup and destination are required");
        }
        const distanceTime = yield services_1.default.getDistanceTime(pickup, destination);
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
    });
}
function generateOtp() {
    const otp = crypto_1.default.randomInt(1000, 10000); // Generates a random number between 1000 and 9999
    return otp.toString();
}
function createRide(user, pickup, destination, vehicleType, fare) {
    return __awaiter(this, void 0, void 0, function* () {
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
        const ride = yield ride_model_1.RideModel.create(rideData);
        return ride;
    });
}
const confirmRide = (rideId, captain) => __awaiter(void 0, void 0, void 0, function* () {
    if (!rideId) {
        throw new Error('Ride id is required');
    }
    yield ride_model_1.RideModel.findOneAndUpdate({ _id: rideId }, { status: 'accepted', captain: captain._id }, { new: true } // Ensures the updated document is returned
    );
    const ride = yield ride_model_1.RideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');
    if (!ride) {
        throw new Error('Ride not found');
    }
    return ride;
});
exports.default = {
    createRide,
    getFare,
    confirmRide
};
