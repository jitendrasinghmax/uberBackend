"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db/db");
const user_route_1 = require("./routes/user.route");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const captain_route_1 = require("./routes/captain.route");
const map_routes_1 = require("./routes/map.routes");
const ride_router_1 = require("./routes/ride.router");
dotenv_1.default.config();
exports.app = (0, express_1.default)();
(0, db_1.connectDb)();
exports.app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"], // Allow requests from these origins
    credentials: true // Allow cookies to be sent
}));
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use('/user', user_route_1.userRoute);
exports.app.use('/captain', captain_route_1.captainRoute);
exports.app.use('/map', map_routes_1.mapRouter);
exports.app.use('/ride', ride_router_1.rideRouter);
exports.app.get('/', (req, resp) => {
    resp.json("this is backend");
});
