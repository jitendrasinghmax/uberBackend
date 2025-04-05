import axios from 'axios';
import { text } from 'express';
import CaptainModel from '../db/captain.model'; // Import the Captain model

export interface distanceTimeInterface {
    distance:{
        text: string,
        value:number
    },
    duration:{
        text: string,
        value:number
    }
}
async function getCoordinatesFromAddress(address: string): Promise<{ lat: number; lng: number }> {
    const apiKey = process.env.GOOGLE_MAP_API; // Ensure your API key is set in environment variables
    const url = `https://maps.googleapis.com/maps/api/geocode/json`;

    try {
        const response = await axios.get(url, {
            params: {
                address,
                key: apiKey,
            },
        });

        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return { lat: location.lat, lng: location.lng };
        } else {
            throw new Error(`Geocoding failed: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
}

async function getDistanceTime(origin: string, destination: string) {
    if (!origin || !destination) {
        throw new Error('destination and origin are required.');
    }

    const apiKey = process.env.GOOGLE_MAP_API;
    
    if (!apiKey) {
    throw new Error('Google Maps API key is not set in environment variables.');
}
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json`;

    try {
        const response = await axios.get(url, {
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
                    distance:{
                        text: element.distance.text,
                        value:element.distance.value
                    },
                    duration:{
                        text: element.duration.text,
                        value:element.duration.value
                    }
                };
            } else {
                throw new Error(`Distance Matrix API element failed: ${element.status}`);
            }
        } else {
            throw new Error(`Distance Matrix API request failed: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error fetching distance and time:', error);
        throw error;
    }
}
getDistanceTime("kolkata","delhi")

async function getAutoSuggestions(input: string): Promise<{ description: string; place_id: string }[]> {
    if (!input) {
        throw new Error('Input is required for auto-suggestions.');
    }

    const apiKey = process.env.GOOGLE_MAP_API; // Ensure your API key is set in environment variables
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;

    try {
        const response = await axios.get(url, {
            params: {
                input,
                key: apiKey,
            },
        });

        if (response.data.status === 'OK') {
            return response.data.predictions.map((prediction: any) => ({
                description: prediction.description,
                place_id: prediction.place_id,
            }));
        } else {
            throw new Error(`Autocomplete API request failed: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error fetching auto-suggestions:', error);
        throw error;
    }
}

async function findNearestCaptain(ltd: number, lng: number, radius: number): Promise<any[]> {
    if (!ltd || !lng || !radius) {
        throw new Error('Latitude, longitude, and radius are required.');
    }

    try {
        const captains = await CaptainModel.model.find(({
            location: {
                $geoWithin: {
                    $centerSphere: [ [ ltd, lng ], radius / 6371 ]
                }
            }
        }));

        return captains;
    } catch (error) {
        console.error('Error finding captains in the radius:', error);
        throw error;
    }
}

export default {
    getCoordinatesFromAddress,
    getDistanceTime,
    getAutoSuggestions,
    findNearestCaptain
};