import { Request, Response, NextFunction } from "express";
import { getCordinateFromAddressZod, getDistanceTimeZod, getAutoSuggesationZod, getFareZod } from "../../controllers/zod.validation";

export const validateGetCoordinatesFromAddress = (req: Request, res: Response, next: NextFunction) => {
    const result = getCordinateFromAddressZod.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            status: "error",
            message: "Validation failed",
            errors: result.error.issues.map(issue => ({
                field: issue.path.join("."),
                message: issue.message
            }))
        });
    } else {
        next();
    }
};

export const validateGetDistanceTime = (req: Request, res: Response, next: NextFunction) => {
    const result = getDistanceTimeZod.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            status: "error",
            message: "Validation failed",
            errors: result.error.issues.map(issue => ({
                field: issue.path.join("."),
                message: issue.message
            }))
        });
    } else {
        next();
    }
};

export const validateGetAutoSuggestions = (req: Request, res: Response, next: NextFunction) => {
    const result = getAutoSuggesationZod.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            status: "error",
            message: "Validation failed",
            errors: result.error.issues.map(issue => ({
                field: issue.path.join("."),
                message: issue.message
            }))
        });
    } else {
        next();
    }
};

export const validateGetFare = (req: Request, res: Response, next: NextFunction) => {
    const result = getFareZod.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            status: "error",
            message: "Validation failed",
            errors: result.error.issues.map(issue => ({
                field: issue.path.join("."),
                message: issue.message
            }))
        });
    } else {
        next();
    }
};

export default {
    validateGetCoordinatesFromAddress,
    validateGetDistanceTime,
    validateGetAutoSuggestions,
    validateGetFare
};
