import { Request,Response,NextFunction } from "express";
import jwt from "../jsonwebtoken/jwt";
import userServices from "../../db/actions/user.services";
const authUser=async function(req:Request,resp:Response,next:NextFunction){
    
    const token=req.cookies.token;
    if(!token){
        resp.status(401).json({
            status: "error",
            message: "Unauthorized"
        });
        return;
    }
    const isBlacklisted=await userServices.getBlackListToken(token);
    if(isBlacklisted){
        resp.status(401).json({
            status: "error",
            message: "Unauthorized"
        });
        return;
    }
    try{
       const decoded:any=jwt.verifyToken(token);
       const user=await userServices.getUser(decoded._id);
         if(!user){
              resp.status(401).json({
                  status: "error",
                  message: "Unauthorized"
              });
         }
         else{
              req.body.user=user;
              next();
         }
    }
    catch(err){
        resp.status(401).json({
            status: "error",
            message: "Unauthorized"
        });
    }
}

export default {
    authUser
};