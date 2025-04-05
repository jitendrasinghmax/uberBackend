"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_validation_1 = require("../../controllers/zod.validation");
const register = function (req, resp, next) {
    const userInput = {
        fullName: {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        },
        email: req.body.email,
        password: req.body.password,
    };
    const result = zod_validation_1.userZod.safeParse(userInput);
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
            if (fieldPath === "fullName.firstName")
                errorObject.fullName.firstName = false;
            if (fieldPath === "fullName.lastName")
                errorObject.fullName.lastName = false;
            if (fieldPath === "email")
                errorObject.email = false;
            if (fieldPath === "password")
                errorObject.password = false;
        });
        resp.status(400).json({
            status: "error",
            message: "is required",
            errors: errorObject
        });
    }
    else {
        next();
    }
};
const login = function (req, resp, next) {
    const userInput = {
        email: req.body.email,
        password: req.body.password,
    };
    const result = zod_validation_1.userZodLogin.safeParse(userInput);
    if (!result.success) {
        const errorObject = {
            email: true,
            password: true
        };
        result.error.issues.forEach(issue => {
            const fieldPath = issue.path.join(".");
            if (fieldPath === "email")
                errorObject.email = false;
            if (fieldPath === "password")
                errorObject.password = false;
        });
        resp.status(400).json({
            status: "error",
            message: "is required",
            errors: errorObject
        });
    }
    else {
        next();
    }
};
exports.default = {
    register,
    login
};
