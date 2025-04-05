"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const captainSchema = new mongoose_1.default.Schema({
    _id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        default: () => new mongoose_1.default.Types.ObjectId(),
    },
    fullName: {
        firstName: { type: String,
            required: true,
            minlength: [3, "first name should be at least of 3 characters"]
        },
        lastName: { type: String,
            required: true,
            minlength: [3, "last name should be at least of 3 characters"]
        },
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    socketId: { type: String, },
    status: { type: String,
        enum: ["active", "inactive"],
        default: "inactive",
        required: true,
    },
    vechial: {
        color: {
            type: String,
            required: true,
            minlength: [3, "color should be at least of 3 characters"]
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "plate should be at least of 3 characters"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "capacity should be at least of 1"]
        },
    },
    location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
});
exports.default = { model: mongoose_1.default.model("captain", captainSchema) };
