"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_validation_1 = require("../../controllers/zod.validation");
const validateCreateRide = (req, res, next) => {
    const result = zod_validation_1.rideCreateZod.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            status: "error",
            message: "Validation failed",
            errors: result.error.issues.map(issue => ({
                field: issue.path.join("."),
                message: issue.message
            }))
        });
    }
    else {
        next();
    }
};
exports.default = {
    validateCreateRide
};
