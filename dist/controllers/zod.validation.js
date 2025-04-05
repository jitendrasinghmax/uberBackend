"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFareZod = exports.rideCreateZod = exports.getAutoSuggesationZod = exports.getDistanceTimeZod = exports.getCordinateFromAddressZod = exports.captainZodLogin = exports.captainZodRegister = exports.userZodLogin = exports.userZod = void 0;
const zod_1 = require("zod");
exports.userZod = zod_1.z.object({
    fullName: zod_1.z.object({
        firstName: zod_1.z
            .string()
            .min(3, "First name must be at least 3 characters")
            .trim(),
        lastName: zod_1.z
            .string()
            .min(3, "Last name must be at least 3 characters")
            .trim(),
    }),
    email: zod_1.z
        .string()
        .min(5, "Email must be at least 5 characters")
        .email("Invalid email format")
        .trim(),
    password: zod_1.z
        .string()
        .min(6, "Password must be at least 6 characters") // Updated min length for security
        .trim(),
    socketId: zod_1.z.string().optional(),
});
exports.userZodLogin = zod_1.z.object({
    email: zod_1.z
        .string()
        .min(5, "Email must be at least 5 characters")
        .email("Invalid email format")
        .trim(),
    password: zod_1.z
        .string()
        .min(6, "Password must be at least 6 characters") // Updated min length for security
        .trim(),
});
exports.captainZodRegister = zod_1.z.object({
    fullName: zod_1.z.object({
        firstName: zod_1.z
            .string()
            .min(3, "First name should be at least 3 characters")
            .trim(),
        lastName: zod_1.z
            .string()
            .min(3, "Last name should be at least 3 characters")
            .trim(),
    }),
    email: zod_1.z
        .string()
        .email("Invalid email format")
        .trim(),
    password: zod_1.z
        .string()
        .min(6, "Password must be at least 6 characters")
        .trim(),
    socketId: zod_1.z.string().optional(),
    status: zod_1.z.enum(["active", "inactive"]).default("inactive"),
    vechial: zod_1.z.object({
        color: zod_1.z
            .string()
            .min(3, "Color should be at least 3 characters")
            .trim(),
        plate: zod_1.z
            .string()
            .min(3, "Plate should be at least 3 characters")
            .trim(),
        capacity: zod_1.z
            .number()
            .min(1, "Capacity should be at least 1"),
    }),
    location: zod_1.z.object({
        ltd: zod_1.z.number().optional(),
        lng: zod_1.z.number().optional(),
    }).optional(),
});
exports.captainZodLogin = zod_1.z.object({
    email: zod_1.z
        .string()
        .min(5, "Email must be at least 5 characters")
        .email("Invalid email format")
        .trim(),
    password: zod_1.z
        .string()
        .min(6, "Password must be at least 6 characters") // Updated min length for security
        .trim(),
});
exports.getCordinateFromAddressZod = zod_1.z.object({
    address: zod_1.z
        .string()
        .min(5, "Address must be at least 5 characters")
        .trim(),
});
exports.getDistanceTimeZod = zod_1.z.object({
    origin: zod_1.z.string(),
    destination: zod_1.z.string(),
});
exports.getAutoSuggesationZod = zod_1.z.object({
    input: zod_1.z
        .string()
});
exports.rideCreateZod = zod_1.z.object({
    fare: zod_1.z.string(),
    pickup: zod_1.z.string().min(3, "Pickup location must be at least 3 characters").trim(),
    destination: zod_1.z.string().min(3, "Destination must be at least 3 characters").trim(),
    vehicleType: zod_1.z.enum(["car", "auto", "motorcycle"])
});
exports.getFareZod = zod_1.z.object({
    origin: zod_1.z.string().min(3, "Origin must be at least 3 characters").trim(),
    destination: zod_1.z.string().min(3, "Destination must be at least 3 characters").trim(),
});
