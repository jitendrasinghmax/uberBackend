import { captainZodRegister, captainZodLogin } from "../../controllers/zod.validation";
import { Request, Response, NextFunction } from "express";

const register = function (req: Request, resp: Response, next: NextFunction) {
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
    
    const result = captainZodRegister.safeParse(captainInput);
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
            if (fieldPath === "fullName.firstName") errorObject.fullName.firstName = false;
            if (fieldPath === "fullName.lastName") errorObject.fullName.lastName = false;
            if (fieldPath === "email") errorObject.email = false;
            if (fieldPath === "password") errorObject.password = false;
            if (fieldPath === "vechial.color") errorObject.vechial.color = false;
            if (fieldPath === "vechial.plate") errorObject.vechial.plate = false;
            if (fieldPath === "vechial.capacity") errorObject.vechial.capacity = false;
            if (fieldPath === "location.ltd") errorObject.location.ltd = false;
            if (fieldPath === "location.lng") errorObject.location.lng = false;
        });

        resp.status(400).json({
            status: "error",
            message: "is required",
            errors: errorObject,
        });
    } else {
        req.body.captain = captainInput; // Assign the validated input back to req.body
        next();
    }
};

const login = function (req: Request, resp: Response, next: NextFunction) {
    const captainInput = {
        email: req.body.email,
        password: req.body.password,
    };

    const result = captainZodLogin.safeParse(captainInput);
    if (!result.success) {
        const errorObject = {
            email: true,
            password: true,
        };

        result.error.issues.forEach((issue) => {
            const fieldPath = issue.path.join(".");
            if (fieldPath === "email") errorObject.email = false;
            if (fieldPath === "password") errorObject.password = false;
        });

        resp.status(400).json({
            status: "error",
            message: "Validation failed",
            errors: errorObject,
        });
    } else {
        req.body.captain = captainInput; // Assign the validated input back to req.body
        next();
    }
};

export default { register, login };