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
const user_services_1 = __importDefault(require("../db/actions/user.services"));
const bcrypt_1 = __importDefault(require("../middleware/bcrypt/bcrypt"));
const jwt_1 = __importDefault(require("../middleware/jsonwebtoken/jwt"));
const registerUser = function (req, resp, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isAllradyExist = yield user_services_1.default.getUserbyEmail(req.body.email);
        if (isAllradyExist) {
            resp.status(400).json({
                status: "error",
                message: "allrady exist",
                errors: {
                    email: false,
                    password: true,
                    fullName: {
                        firstName: true,
                        lastName: true
                    }
                }
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hashPassword(req.body.password);
        const user = yield user_services_1.default.createUser({
            fullName: {
                firstName: req.body.firstName,
                lastName: req.body.lastName
            },
            email: req.body.email,
            password: hashedPassword
        });
        const token = jwt_1.default.getToken(user._id);
        resp.cookie("token", token);
        resp.status(200).json({
            status: "success",
            message: "User registered successfully",
            token
        });
    });
};
const loginUser = function (req, resp, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_services_1.default.getUserWithPassword(req.body.email);
        if (!user) {
            resp.status(401).json({
                status: "error",
                message: "Invalid email or password"
            });
        }
        else {
            const isMatch = yield bcrypt_1.default.comparePassword(req.body.password, user.password);
            if (!isMatch) {
                resp.status(401).json({
                    status: "error",
                    message: "Invalid email or password"
                });
            }
            else {
                const token = jwt_1.default.getToken(user._id.toString());
                resp.cookie("token", token);
                resp.status(200).json({
                    status: "success",
                    message: "Login successful",
                    token
                });
            }
        }
    });
};
const userProfile = function (req, resp, next) {
    return __awaiter(this, void 0, void 0, function* () {
        resp.status(200).json({ user: req.body.user, message: "logged in sucessfully" });
    });
};
const logoutUser = function (req, resp, next) {
    return __awaiter(this, void 0, void 0, function* () {
        resp.clearCookie("token");
        yield user_services_1.default.createBlackListToken(req.cookies.token);
        resp.status(200).json({
            status: "success",
            message: "Logout successful"
        });
    });
};
exports.default = {
    registerUser,
    loginUser,
    userProfile,
    logoutUser
};
