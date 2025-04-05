import { z } from "zod";

export const userZod = z.object({
    fullName: z.object({
        firstName: z
            .string()
            .min(3, "First name must be at least 3 characters")
            .trim(),
        lastName: z
            .string()
            .min(3, "Last name must be at least 3 characters")
            .trim(),
    }),

    email: z
        .string()
        .min(5, "Email must be at least 5 characters")
        .email("Invalid email format")
        .trim(),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters") // Updated min length for security
        .trim(),

    socketId: z.string().optional(),
});

export const userZodLogin = z.object({
    email: z
        .string()
        .min(5, "Email must be at least 5 characters")
        .email("Invalid email format")
        .trim(),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters") // Updated min length for security
        .trim(),
});

// **💡 Export the TypeScript type**
export type UserType = z.infer<typeof userZod>;

export const captainZodRegister = z.object({
    fullName: z.object({
        firstName: z
            .string()
            .min(3, "First name should be at least 3 characters")
            .trim(),
        lastName: z
            .string()
            .min(3, "Last name should be at least 3 characters")
            .trim(),
    }),
    email: z
        .string()
        .email("Invalid email format")
        .trim(),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .trim(),
    socketId: z.string().optional(),
    status: z.enum(["active", "inactive"]).default("inactive"),
    vechial: z.object({
        color: z
            .string()
            .min(3, "Color should be at least 3 characters")
            .trim(),
        plate: z
            .string()
            .min(3, "Plate should be at least 3 characters")
            .trim(),
        capacity: z
            .number()
            .min(1, "Capacity should be at least 1"),
    }),
    location: z.object({
        ltd: z.number().optional(),
        lng: z.number().optional(),
    }).optional(),
});

// **💡 Export the TypeScript type**
export type CaptainType = z.infer<typeof captainZodRegister>;
export const captainZodLogin = z.object({
    email: z
        .string()
        .min(5, "Email must be at least 5 characters")
        .email("Invalid email format")
        .trim(),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters") // Updated min length for security
        .trim(),
});

export const getCordinateFromAddressZod = z.object({
    address: z
        .string()
        .min(5, "Address must be at least 5 characters")
        .trim(),
});

export const getDistanceTimeZod = z.object({
    origin:z.string(),
    destination:z.string(),
});

export const getAutoSuggesationZod = z.object({
    input: z
        .string()
});

// Export the new types
export type GetCordinateFromAddressType = z.infer<typeof getCordinateFromAddressZod>;
export type GetDistanceTimeType = z.infer<typeof getDistanceTimeZod>;
export type GetAutoSuggesationType = z.infer<typeof getAutoSuggesationZod>;

export const rideCreateZod = z.object({
    fare:z.string(),
    pickup: z.string().min(3, "Pickup location must be at least 3 characters").trim(),
    destination: z.string().min(3, "Destination must be at least 3 characters").trim(),
    vehicleType:z.enum(["car","auto","motorcycle"])
});

// Export the new type
export type RideCreateType = z.infer<typeof rideCreateZod>;

export const getFareZod = z.object({
    origin: z.string().min(3, "Origin must be at least 3 characters").trim(),
    destination: z.string().min(3, "Destination must be at least 3 characters").trim(),
});
