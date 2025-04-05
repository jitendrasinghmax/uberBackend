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
const captain_service_1 = __importDefault(require("../db/actions/captain.service"));
const jwt_1 = __importDefault(require("../middleware/jsonwebtoken/jwt"));
const bcrypt_1 = __importDefault(require("../middleware/bcrypt/bcrypt"));
const user_services_1 = __importDefault(require("../db/actions/user.services"));
function registerCaptain(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const isAllradyExist = yield captain_service_1.default.getCaptainbyEmail(req.body.email);
        if (isAllradyExist) {
            res.status(400).json({
                status: "error",
                message: "Captain already exists",
                errors: {
                    fullName: {
                        firstName: true,
                        lastName: true,
                    },
                    email: false,
                    password: true,
                    vechial: {
                        color: true,
                        plate: true,
                        capacity: true,
                    },
                    location: {
                        ltd: true,
                        lng: true,
                    },
                }
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hashPassword(req.body.password);
        const captain = yield captain_service_1.default.createCaptain(Object.assign(Object.assign({}, req.body.captain), { password: hashedPassword }));
        const token = jwt_1.default.getToken(captain._id.toString());
        res.cookie('token', token);
        res.status(200).json({ token, message: "registered sucessfully" });
    });
}
function loginCaptain(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const captain = yield captain_service_1.default.getCaptainWithPassword(req.body.email);
        if (!captain) {
            res.status(401).json({ message: "Invalid email or password" });
        }
        else {
            const isMatch = yield bcrypt_1.default.comparePassword(req.body.password, captain.password);
            if (!isMatch) {
                res.status(401).json({ message: "Invalid email or password" });
            }
            else {
                const token = jwt_1.default.getToken(captain._id.toString());
                res.cookie("token", token);
                res.status(200).json({ message: "logged in sucessfully" });
            }
        }
    });
}
function captainProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(200).json({ captain: req.body.captain });
    });
}
function logoutCaptain(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.clearCookie("token");
        yield user_services_1.default.createBlackListToken(req.cookies.token);
        res.status(200).json({ message: "Logout successful" });
    });
}
exports.default = {
    registerCaptain,
    loginCaptain,
    captainProfile,
    logoutCaptain
};
