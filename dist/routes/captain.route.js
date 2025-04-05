"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.captainRoute = void 0;
const express_1 = require("express");
const captain_validaiton_1 = __importDefault(require("../middleware/validation/captain.validaiton"));
const captain_controller_1 = __importDefault(require("../controllers/captain.controller"));
const authCaptain_1 = __importDefault(require("../middleware/auth/authCaptain"));
exports.captainRoute = (0, express_1.Router)();
exports.captainRoute.post('/register', captain_validaiton_1.default.register, captain_controller_1.default.registerCaptain);
exports.captainRoute.post('/login', captain_validaiton_1.default.login, captain_controller_1.default.loginCaptain);
exports.captainRoute.post('/profile', authCaptain_1.default, captain_controller_1.default.captainProfile);
exports.captainRoute.post('/logout', authCaptain_1.default, captain_controller_1.default.logoutCaptain);
