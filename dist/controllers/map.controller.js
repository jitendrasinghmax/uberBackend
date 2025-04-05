"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFare = exports.getAutoSuggestions = exports.getDistanceTime = exports.getcordinates = void 0;
const services_1 = __importDefault(require("../maps/services"));
const ride_service_1 = __importDefault(require("../maps/ride.service"));
const getcordinates = (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    const address = req.body.address;
    try {
        const coordinates = yield services_1.default.getCoordinatesFromAddress(address);
        resp.status(200).json(coordinates);
    }
    catch (e) {
        resp.status(404).json({ message: "cordinates not found" });
    }
});
exports.getcordinates = getcordinates;
const getDistanceTime = (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { origin, destination } = req.body;
    try {
        const time = yield services_1.default.getDistanceTime(origin, destination);
        resp.status(200).json(time);
    }
    catch (e) {
        resp.status(500).json({ message: e.message });
    }
});
exports.getDistanceTime = getDistanceTime;
const getAutoSuggestions = (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    const input = req.body.input;
    if (!input) {
        resp.status(400).json({ message: "Input is required for auto-suggestions." });
        return;
    }
    try {
        const suggestions = yield services_1.default.getAutoSuggestions(input);
        resp.status(200).json(suggestions);
    }
    catch (e) {
        resp.status(500).json({ message: "Internal server error" });
    }
});
exports.getAutoSuggestions = getAutoSuggestions;
const getFare = (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { origin, destination } = req.body;
    try {
        const fare = yield ride_service_1.default.getFare(origin, destination);
        resp.status(200).json(fare);
    }
    catch (e) {
        resp.status(500).json({ message: e.message });
    }
});
exports.getFare = getFare;
