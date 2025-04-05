import mongoose, { Schema, Document } from "mongoose";

export interface IRide extends Document {
    user: mongoose.Schema.Types.ObjectId;
    captain?: mongoose.Schema.Types.ObjectId;
    pickup: string;
    destination: string;
    fare: number;
    status: "pending" | "accepted" | "ongoing" | "completed" | "cancelled";
    duration?: number; // in seconds
    distance?: number; // in meters
    paymentID?: string;
    orderId?: string;
    signature?: string;
    otp: string;
}

const rideSchema: Schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
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

export const RideModel = mongoose.model<IRide>("Ride", rideSchema);
