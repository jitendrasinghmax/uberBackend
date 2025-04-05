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
        const errorArray = result.error.issues.map(issue => ({
            field: issue.path.join("."), // "fullName.firstName"
            message: issue.message
        }));
        resp.status(400).json({ error: errorArray });
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
        const errorArray = result.error.issues.map(issue => ({
            field: issue.path.join("."), // "fullName.firstName"
            message: issue.message
        }));
        resp.status(400).json({ error: errorArray });
    }
    else {
        next();
    }
};
exports.default = {
    register,
    login
};
