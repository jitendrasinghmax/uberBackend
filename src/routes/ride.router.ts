import { Request,Response,NextFunction, Router } from "express";
import authUser from "../middleware/auth/authUser";
import rideController from "../controllers/ride.controller";
import rideValidation from "../middleware/validation/ride.validation";
import authCaptain from "../middleware/auth/authCaptain";


export const rideRouter=Router();

rideRouter.post('/create',authUser.authUser,rideValidation.validateCreateRide,rideController.createRide)
rideRouter.post('/confirm',authCaptain,rideController.confirmRide)
rideRouter.post('/start-ride',authCaptain,rideController.startRide)
rideRouter.post('/end-user-ride', authUser.authUser, rideController.endUserRide);
rideRouter.post('/end-captain-ride', authCaptain, rideController.endCaptainRide);