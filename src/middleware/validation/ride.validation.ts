import { Request, Response, NextFunction } from "express";
import { rideCreateZod } from "../../controllers/zod.validation";

const validateCreateRide = (req: Request, res: Response, next: NextFunction) => {
    const result = rideCreateZod.safeParse(req.body);
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
    validateCreateRide
};
