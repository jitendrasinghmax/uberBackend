import { Router } from "express";
import captainValidation from "../middleware/validation/captain.validaiton";
import captainController from "../controllers/captain.controller";
import authCaptain from "../middleware/auth/authCaptain";


export const captainRoute = Router();

captainRoute.post('/register',captainValidation.register,captainController.registerCaptain);
captainRoute.post('/login',captainValidation.login,captainController.loginCaptain);
captainRoute.post('/profile',authCaptain,captainController.captainProfile);
captainRoute.post('/logout',authCaptain,captainController.logoutCaptain);
