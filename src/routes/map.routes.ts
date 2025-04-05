import { Router } from "express";
import { Request,Response,NextFunction } from "express";
import authUser from "../middleware/auth/authUser";
import { getcordinates, getDistanceTime, getAutoSuggestions, getFare } from "../controllers/map.controller";
import mapValidation from "../middleware/validation/mapValidation";

export const mapRouter=Router();

mapRouter.post('/getcordinates',mapValidation.validateGetCoordinatesFromAddress,authUser.authUser,getcordinates)
mapRouter.post('/getDistanceTime',authUser.authUser,mapValidation.validateGetDistanceTime,getDistanceTime)
mapRouter.post('/getAutoSuggestions', authUser.authUser,mapValidation.validateGetAutoSuggestions, getAutoSuggestions);
mapRouter.post('/getFare', authUser.authUser, mapValidation.validateGetFare, getFare);