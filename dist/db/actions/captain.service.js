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
const captain_model_1 = __importDefault(require("../captain.model"));
function createCaptain(captainData) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield captain_model_1.default.model.create(captainData);
        return result;
    });
}
function getCaptainWithPassword(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield captain_model_1.default.model.findOne({ email }).select('+password').exec();
        return result;
    });
}
function getCaptain(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield captain_model_1.default.model.findOne({ _id });
        return result;
    });
}
function getCaptainbyEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield captain_model_1.default.model.findOne({ email });
        return result;
    });
}
exports.default = {
    createCaptain,
    getCaptainWithPassword,
    getCaptain,
    getCaptainbyEmail
};
