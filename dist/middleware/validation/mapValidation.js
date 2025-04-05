"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGetFare = exports.validateGetAutoSuggestions = exports.validateGetDistanceTime = exports.validateGetCoordinatesFromAddress = void 0;
const zod_validation_1 = require("../../controllers/zod.validation");
const validateGetCoordinatesFromAddress = (req, res, next) => {
    const result = zod_validation_1.getCordinateFromAddressZod.safeParse(req.body);
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
exports.validateGetCoordinatesFromAddress = validateGetCoordinatesFromAddress;
const validateGetDistanceTime = (req, res, next) => {
    const result = zod_validation_1.getDistanceTimeZod.safeParse(req.body);
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
exports.validateGetDistanceTime = validateGetDistanceTime;
const validateGetAutoSuggestions = (req, res, next) => {
    const result = zod_validation_1.getAutoSuggesationZod.safeParse(req.body);
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
exports.validateGetAutoSuggestions = validateGetAutoSuggestions;
const validateGetFare = (req, res, next) => {
    const result = zod_validation_1.getFareZod.safeParse(req.body);
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
exports.validateGetFare = validateGetFare;
exports.default = {
    validateGetCoordinatesFromAddress: exports.validateGetCoordinatesFromAddress,
    validateGetDistanceTime: exports.validateGetDistanceTime,
    validateGetAutoSuggestions: exports.validateGetAutoSuggestions,
    validateGetFare: exports.validateGetFare
};
