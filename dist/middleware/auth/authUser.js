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
const jwt_1 = __importDefault(require("../jsonwebtoken/jwt"));
const user_services_1 = __importDefault(require("../../db/actions/user.services"));
const authUser = function (req, resp, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.token;
        if (!token) {
            resp.status(401).json({
                status: "error",
                message: "Unauthorized"
            });
            return;
        }
        const isBlacklisted = yield user_services_1.default.getBlackListToken(token);
        if (isBlacklisted) {
            resp.status(401).json({
                status: "error",
                message: "Unauthorized"
            });
            return;
        }
        try {
            const decoded = jwt_1.default.verifyToken(token);
            const user = yield user_services_1.default.getUser(decoded._id);
            if (!user) {
                resp.status(401).json({
                    status: "error",
                    message: "Unauthorized"
                });
            }
            else {
                req.body.user = user;
                next();
            }
        }
        catch (err) {
            resp.status(401).json({
                status: "error",
                message: "Unauthorized"
            });
        }
    });
};
exports.default = {
    authUser
};
