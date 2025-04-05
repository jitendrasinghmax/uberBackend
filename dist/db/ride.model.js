"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const rideSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    captain: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "captain", // Updated to match the registered model name
    },
    pickup: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    fare: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
        default: "pending",
    },
    duration: {
        type: Number,
    },
    distance: {
        type: Number,
    },
    paymentID: {
        type: String,
    },
    orderId: {
        type: String,
    },
    signature: {
        type: String,
    },
    otp: {
        type: String,
        select: false,
        required: true,
    },
});
exports.RideModel = mongoose_1.default.model("Ride", rideSchema);
