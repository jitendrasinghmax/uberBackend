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
const ride_service_1 = __importDefault(require("../maps/ride.service"));
const services_1 = __importDefault(require("../maps/services"));
const socket_1 = require("../socket");
const ride_model_1 = require("../db/ride.model");
const createRide = (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body.user;
    const { destination, pickup, vehicleType, fare } = req.body;
    try {
        const ride = yield ride_service_1.default.createRide(_id, destination, pickup, vehicleType, fare);
        const pickupCoordinate = yield services_1.default.getCoordinatesFromAddress(pickup);
        console.log(pickupCoordinate);
        const captainInRadius = yield services_1.default.findNearestCaptain(pickupCoordinate.lat, pickupCoordinate.lng, 10);
        const rideWithUser = yield ride_model_1.RideModel.findOne({ _id: ride._id }).populate({ path: "user", strictPopulate: false });
        console.log(rideWithUser);
        captainInRadius.map((captain) => {
            (0, socket_1.sendMessageToSocketId)(captain.socketId, {
                event: "new-ride",
                data: rideWithUser,
            });
        });
        resp.status(200).json(ride);
    }
    catch (error) {
        resp.status(400).json({ message: error.message });
    }
});
const confirmRide = (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { rideId } = req.body;
    const { captain } = req.body;
    if (!rideId) {
        resp.status(400).json({ message: "rideId not found" });
        return;
    }
    try {
        const ride = yield ride_service_1.default.confirmRide(rideId, captain._id);
        console.log("rideObject", ride);
        if (ride.user && ride.user.socketId) {
            (0, socket_1.sendMessageToSocketId)(ride.user.socketId, {
                event: "ride-confirmed",
                data: ride,
            });
        }
        else {
            console.error("User or socketId not found in ride");
        }
        resp.status(200).json(ride);
    }
    catch (e) {
        resp.status(400).json({ message: e.message });
    }
});
const startRide = (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { rideId } = req.body;
    const { captain } = req.body;
    const { otp } = req.body;
    if (!rideId || !otp) {
        resp.status(400).json({ message: "rideId not found or Otp not found" });
        return;
    }
    try {
        const ride = yield ride_model_1.RideModel.findOne({ _id: rideId }).populate({ path: "user", strictPopulate: false }).populate({ path: "captain", strictPopulate: false }).select("+otp");
        if (!ride) {
            resp.status(400).json({ message: "ride not found" });
            return;
        }
        if (ride.otp != otp) {
            resp.status(400).json({ message: "invalid otp" });
            return;
        }
        yield ride_model_1.RideModel.findByIdAndUpdate(rideId, {
            status: "ongoing"
        });
        (0, socket_1.sendMessageToSocketId)(ride.user.socketId, {
            event: "ride-started",
            data: ride
        });
        resp.status(200).json(ride);
    }
    catch (e) {
        resp.status(400).json({ message: e.message });
    }
});
const endUserRide = (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { rideId } = req.body;
    if (!rideId) {
        resp.status(400).json({ message: "rideId not found" });
        return;
    }
    try {
        const ride = yield ride_model_1.RideModel.findOne({ _id: rideId }).populate("user").populate("captain");
        if (!ride) {
            resp.status(400).json({ message: "Ride not found" });
            return;
        }
        yield ride_model_1.RideModel.findByIdAndUpdate(rideId, { status: "completed" });
        if ((_a = ride.user) === null || _a === void 0 ? void 0 : _a.socketId) {
            (0, socket_1.sendMessageToSocketId)(ride.user.socketId, {
                event: "end-ride",
                data: ride,
            });
        }
        if ((_b = ride.captain) === null || _b === void 0 ? void 0 : _b.socketId) {
            (0, socket_1.sendMessageToSocketId)(ride.captain.socketId, {
                event: "end-ride",
                data: ride,
            });
        }
        resp.status(200).json({ message: "Ride ended successfully" });
    }
    catch (error) {
        resp.status(400).json({ message: error.message });
    }
});
const endCaptainRide = (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { rideId } = req.body;
    if (!rideId) {
        resp.status(400).json({ message: "rideId not found" });
        return;
    }
    try {
        const ride = yield ride_model_1.RideModel.findOne({ _id: rideId }).populate("user").populate("captain");
        if (!ride) {
            resp.status(400).json({ message: "Ride not found" });
            return;
        }
        if (ride.status !== "ongoing") {
            resp.status(400).json({ message: "invalid Ride action" });
            return;
        }
        yield ride_model_1.RideModel.findByIdAndUpdate(rideId, { status: "completed" });
        if ((_a = ride.user) === null || _a === void 0 ? void 0 : _a.socketId) {
            (0, socket_1.sendMessageToSocketId)(ride.user.socketId, {
                event: "end-ride",
                data: ride,
            });
        }
        if ((_b = ride.captain) === null || _b === void 0 ? void 0 : _b.socketId) {
            (0, socket_1.sendMessageToSocketId)(ride.captain.socketId, {
                event: "end-ride",
                data: ride,
            });
        }
        resp.status(200).json({ message: "Ride ended successfully" });
    }
    catch (error) {
        resp.status(400).json({ message: error.message });
    }
});
exports.default = {
    createRide,
    confirmRide,
    startRide,
    endUserRide,
    endCaptainRide,
};
