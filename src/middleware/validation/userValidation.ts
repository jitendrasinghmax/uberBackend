import { Request, Response, NextFunction } from 'express';
import { userZod, userZodLogin } from '../../controllers/zod.validation';

const register = function (req: Request, resp: Response, next: NextFunction) {
    const userInput = {
        fullName: {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        },
        email: req.body.email,
        password: req.body.password,
    };
    const result = userZod.safeParse(userInput);
    if (!result.success) {
        const errorObject = {
            fullName: {
                firstName: true,
                lastName: true
            },
            email: true,
            password: true
        };
        result.error.issues.forEach(issue => {
            const fieldPath = issue.path.join(".");
            if (fieldPath === "fullName.firstName") errorObject.fullName.firstName = false;
            if (fieldPath === "fullName.lastName") errorObject.fullName.lastName = false;
            if (fieldPath === "email") errorObject.email = false;
            if (fieldPath === "password") errorObject.password = false;
        });
        resp.status(400).json({
            status: "error",
            message: "is required",
            errors: errorObject
        });
    } else {
        next();
    }
};

const login = function (req: Request, resp: Response, next: NextFunction) {
    const userInput = {
        email: req.body.email,
        password: req.body.password,
    };
    const result = userZodLogin.safeParse(userInput);
    if (!result.success) {
        const errorObject = {
            email: true,
            password: true
        };
        result.error.issues.forEach(issue => {
            const fieldPath = issue.path.join(".");
            if (fieldPath === "email") errorObject.email = false;
            if (fieldPath === "password") errorObject.password = false;
        });
        resp.status(400).json({
            status: "error",
            message: "is required",
            errors: errorObject
        });
    } else {
        next();
    }
};

export default {
    register,
    login
};