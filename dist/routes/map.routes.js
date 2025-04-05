"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapRouter = void 0;
const express_1 = require("express");
const authUser_1 = __importDefault(require("../middleware/auth/authUser"));
const map_controller_1 = require("../controllers/map.controller");
const mapValidation_1 = __importDefault(require("../middleware/validation/mapValidation"));
exports.mapRouter = (0, express_1.Router)();
exports.mapRouter.post('/getcordinates', mapValidation_1.default.validateGetCoordinatesFromAddress, authUser_1.default.authUser, map_controller_1.getcordinates);
exports.mapRouter.post('/getDistanceTime', authUser_1.default.authUser, mapValidation_1.default.validateGetDistanceTime, map_controller_1.getDistanceTime);
exports.mapRouter.post('/getAutoSuggestions', authUser_1.default.authUser, mapValidation_1.default.validateGetAutoSuggestions, map_controller_1.getAutoSuggestions);
exports.mapRouter.post('/getFare', authUser_1.default.authUser, mapValidation_1.default.validateGetFare, map_controller_1.getFare);
