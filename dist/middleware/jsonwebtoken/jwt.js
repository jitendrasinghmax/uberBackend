"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getToken(_id) {
    return jsonwebtoken_1.default.sign({ _id }, process.env.SECRET || "", { expiresIn: "24h" });
}
function verifyToken(_id) {
    return jsonwebtoken_1.default.verify(_id, process.env.SECRET || "");
}
exports.default = {
    getToken,
    verifyToken
};
