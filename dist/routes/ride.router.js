"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rideRouter = void 0;
const express_1 = require("express");
const authUser_1 = __importDefault(require("../middleware/auth/authUser"));
const ride_controller_1 = __importDefault(require("../controllers/ride.controller"));
const ride_validation_1 = __importDefault(require("../middleware/validation/ride.validation"));
const authCaptain_1 = __importDefault(require("../middleware/auth/authCaptain"));
exports.rideRouter = (0, express_1.Router)();
exports.rideRouter.post('/create', authUser_1.default.authUser, ride_validation_1.default.validateCreateRide, ride_controller_1.default.createRide);
exports.rideRouter.post('/confirm', authCaptain_1.default, ride_controller_1.default.confirmRide);
exports.rideRouter.post('/start-ride', authCaptain_1.default, ride_controller_1.default.startRide);
exports.rideRouter.post('/end-user-ride', authUser_1.default.authUser, ride_controller_1.default.endUserRide);
exports.rideRouter.post('/end-captain-ride', authCaptain_1.default, ride_controller_1.default.endCaptainRide);
