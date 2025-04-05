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
const user_model_1 = require("../user.model");
const balcklistToken_model_1 = __importDefault(require("../balcklistToken.model"));
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield user_model_1.userModel.create(user);
        return result;
    });
}
function getUser(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield user_model_1.userModel.findOne({ _id });
        return result;
    });
}
function getUserbyEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield user_model_1.userModel.findOne({ email });
        return result;
    });
}
function getUserWithPassword(email) {
    const result = user_model_1.userModel.findOne({ email }).select('+password').exec();
    return result;
}
function createBlackListToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield balcklistToken_model_1.default.create({ token });
        return result;
    });
}
function getBlackListToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield balcklistToken_model_1.default.findOne({ token });
        return result;
    });
}
exports.default = {
    createUser,
    getUser,
    getUserWithPassword,
    createBlackListToken,
    getBlackListToken,
    getUserbyEmail
};
