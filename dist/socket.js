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
exports.initializeSocket = initializeSocket;
exports.sendMessageToSocketId = sendMessageToSocketId;
const socket_io_1 = require("socket.io");
const user_model_1 = require("./db/user.model");
const captain_model_1 = __importDefault(require("./db/captain.model"));
let io;
function initializeSocket(server) {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: '*', // Allow requests from these origins
            methods: ["GET", "POST"],
            credentials: true
        }
    });
    io.on("connection", (socket) => {
        console.log(`Socket connected: ${socket.id}`);
        socket.on("join", (data) => __awaiter(this, void 0, void 0, function* () {
            const { userId, userType } = data;
            if (userType === "user") {
                yield user_model_1.userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
            if (userType === "captain") {
                yield captain_model_1.default.model.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        }));
        socket.on("update-location-captain", (data) => __awaiter(this, void 0, void 0, function* () {
            const { userId, location } = data;
            console.log(data);
            if (!userId) {
                socket.emit('error', { message: "captin id not found" });
                return;
            }
            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: "invalid location data" });
            }
            const result = yield captain_model_1.default.model.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
        }));
        socket.on('captain-location', (data) => __awaiter(this, void 0, void 0, function* () {
            const { socketId, location } = data;
            console.log("captain", data);
            if (!location || !location.lat || !location.lng) {
                return socket.emit('error', { message: "invalid location data" });
            }
            sendMessageToSocketId(socketId, {
                event: "update-location",
                data: {
                    location: {
                        lat: location.lat,
                        lng: location.lng
                    }
                }
            });
        }));
        socket.on('user-location', (data) => __awaiter(this, void 0, void 0, function* () {
            const { socketId, location } = data;
            if (!location || !location.lat || !location.lng) {
                return socket.emit('error', { message: "invalid location data" });
            }
            console.log("user", data);
            sendMessageToSocketId(socketId, {
                event: "update-location",
                data: {
                    location: {
                        lat: location.lat,
                        lng: location.lng
                    }
                }
            });
        }));
        socket.on("disconnect", () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });
}
function sendMessageToSocketId(socketId, message) {
    if (io) {
        io.to(socketId).emit(message.event, message.data);
    }
    else {
        console.error("Socket.io is not initialized.");
    }
}
