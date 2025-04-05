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
const axios_1 = __importDefault(require("axios"));
const captain_model_1 = __importDefault(require("../db/captain.model")); // Import the Captain model
function getCoordinatesFromAddress(address) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiKey = process.env.GOOGLE_MAP_API; // Ensure your API key is set in environment variables
        const url = `https://maps.googleapis.com/maps/api/geocode/json`;
        try {
            const response = yield axios_1.default.get(url, {
                params: {
                    address,
                    key: apiKey,
                },
            });
            if (response.data.status === 'OK') {
                const location = response.data.results[0].geometry.location;
                return { lat: location.lat, lng: location.lng };
            }
            else {
                throw new Error(`Geocoding failed: ${response.data.status}`);
            }
        }
        catch (error) {
            console.error('Error fetching coordinates:', error);
            throw error;
        }
    });
}
function getDistanceTime(origin, destination) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!origin || !destination) {
            throw new Error('destination and origin are required.');
        }
        const apiKey = process.env.GOOGLE_MAP_API;
        if (!apiKey) {
            throw new Error('Google Maps API key is not set in environment variables.');
        }
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json`;
        try {
            const response = yield axios_1.default.get(url, {
                params: {
                    origins: origin,
                    destinations: destination,
                    key: apiKey,
                },
            });
            if (response.data.status === 'OK') {
                const element = response.data.rows[0].elements[0];
                if (element.status === 'OK') {
                    return {
                        distance: {
                            text: element.distance.text,
                            value: element.distance.value
                        },
                        duration: {
                            text: element.duration.text,
                            value: element.duration.value
                        }
                    };
                }
                else {
                    throw new Error(`Distance Matrix API element failed: ${element.status}`);
                }
            }
            else {
                throw new Error(`Distance Matrix API request failed: ${response.data.status}`);
            }
        }
        catch (error) {
            console.error('Error fetching distance and time:', error);
            throw error;
        }
    });
}
getDistanceTime("kolkata", "delhi");
function getAutoSuggestions(input) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!input) {
            throw new Error('Input is required for auto-suggestions.');
        }
        const apiKey = process.env.GOOGLE_MAP_API; // Ensure your API key is set in environment variables
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;
        try {
            const response = yield axios_1.default.get(url, {
                params: {
                    input,
                    key: apiKey,
                },
            });
            if (response.data.status === 'OK') {
                return response.data.predictions.map((prediction) => ({
                    description: prediction.description,
                    place_id: prediction.place_id,
                }));
            }
            else {
                throw new Error(`Autocomplete API request failed: ${response.data.status}`);
            }
        }
        catch (error) {
            console.error('Error fetching auto-suggestions:', error);
            throw error;
        }
    });
}
function findNearestCaptain(ltd, lng, radius) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!ltd || !lng || !radius) {
            throw new Error('Latitude, longitude, and radius are required.');
        }
        try {
            const captains = yield captain_model_1.default.model.find(({
                location: {
                    $geoWithin: {
                        $centerSphere: [[ltd, lng], radius / 6371]
                    }
                }
            }));
            return captains;
        }
        catch (error) {
            console.error('Error finding captains in the radius:', error);
            throw error;
        }
    });
}
exports.default = {
    getCoordinatesFromAddress,
    getDistanceTime,
    getAutoSuggestions,
    findNearestCaptain
};
