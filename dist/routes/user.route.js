"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const userValidation_1 = __importDefault(require("../middleware/validation/userValidation"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const authUser_1 = __importDefault(require("../middleware/auth/authUser"));
exports.userRoute = (0, express_1.Router)();
exports.userRoute.post('/register', userValidation_1.default.register, user_controller_1.default.registerUser);
exports.userRoute.post('/login', userValidation_1.default.login, user_controller_1.default.loginUser);
exports.userRoute.post('/profile', authUser_1.default.authUser, user_controller_1.default.userProfile);
exports.userRoute.post('/logout', authUser_1.default.authUser, user_controller_1.default.logoutUser);
