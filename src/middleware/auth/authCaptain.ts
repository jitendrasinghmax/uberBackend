import e, { Request,Response,NextFunction } from "express";
import jwt from "../jsonwebtoken/jwt";
import captainService from "../../db/actions/captain.service";
import userServices from "../../db/actions/user.services";

const authCaptain=async function(req:Request,resp:Response,next:NextFunction){
    const token=req.cookies.token;
    if(!token){
        resp.status(401).json({message:"Unauthorized"});
    }
    try{
        const decoded:any=jwt.verifyToken(token);
        if(!decoded){
            resp.status(401).json({message:"Unauthorized"});
        }
        const isBlacklisted=await userServices.getBlackListToken(token);
        if(isBlacklisted){
            resp.status(401).json({message:"Unauthorized"});
        }
        const captain=await captainService.getCaptain(decoded._id);
        if(!captain){
            resp.status(401).json({message:"Unauthorized"});
        }
        else{
            req.body.captain=captain;
            next();
        }
    }
    catch(err){
        resp.status(401).json({message:"unauthorized"});
    }
}
export default authCaptain
