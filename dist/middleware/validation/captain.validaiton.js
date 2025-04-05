"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_validation_1 = require("../../controllers/zod.validation");
const register = function (req, resp, next) {
    const captainInput = {
        fullName: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        },
        email: req.body.email,
        password: req.body.password,
        socketId: req.body.socketId,
        status: req.body.status,
        vechial: {
            color: req.body.color,
            plate: req.body.plate,
            capacity: Number(req.body.capacity),
        },
        location: req.body.location
            ? {
                ltd: req.body.location.ltd,
                lng: req.body.location.lng,
            }
            : undefined,
    };
    const result = zod_validation_1.captainZodRegister.safeParse(captainInput);
    if (!result.success) {
        const errorObject = {
            fullName: {
                firstName: true,
                lastName: true,
            },
            email: true,
            password: true,
            vechial: {
                color: true,
                plate: true,
                capacity: true,
            },
            location: {
                ltd: true,
                lng: true,
            },
        };
        result.error.issues.forEach((issue) => {
            const fieldPath = issue.path.join(".");
            if (fieldPath === "fullName.firstName")
                errorObject.fullName.firstName = false;
            if (fieldPath === "fullName.lastName")
                errorObject.fullName.lastName = false;
            if (fieldPath === "email")
                errorObject.email = false;
            if (fieldPath === "password")
                errorObject.password = false;
            if (fieldPath === "vechial.color")
                errorObject.vechial.color = false;
            if (fieldPath === "vechial.plate")
                errorObject.vechial.plate = false;
            if (fieldPath === "vechial.capacity")
                errorObject.vechial.capacity = false;
            if (fieldPath === "location.ltd")
                errorObject.location.ltd = false;
            if (fieldPath === "location.lng")
                errorObject.location.lng = false;
        });
        resp.status(400).json({
            status: "error",
            message: "is required",
            errors: errorObject,
        });
    }
    else {
        req.body.captain = captainInput; // Assign the validated input back to req.body
        next();
    }
};
const login = function (req, resp, next) {
    const captainInput = {
        email: req.body.email,
        password: req.body.password,
    };
    const result = zod_validation_1.captainZodLogin.safeParse(captainInput);
    if (!result.success) {
        const errorObject = {
            email: true,
            password: true,
        };
        result.error.issues.forEach((issue) => {
            const fieldPath = issue.path.join(".");
            if (fieldPath === "email")
                errorObject.email = false;
            if (fieldPath === "password")
                errorObject.password = false;
        });
        resp.status(400).json({
            status: "error",
            message: "Validation failed",
            errors: errorObject,
        });
    }
    else {
        req.body.captain = captainInput; // Assign the validated input back to req.body
        next();
    }
};
exports.default = { register, login };
