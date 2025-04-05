"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, "First name must of at least 3 character"]
        },
        lastName: {
            type: String,
            required: true,
            minlength: [3, "Last name must of at least 3 character"]
        }
    },
    email: {
        type: String,
        required: true,
        minlength: [5, "Email name must of at least 5 character"]
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [5, "password must be of at least 6 character"]
    },
    socketId: {
        type: String,
    }
});
exports.userModel = mongoose_1.default.model('user', userSchema);
