import { Request, response, Response } from 'express';
import captainService from '../db/actions/captain.service';
import jwt from '../middleware/jsonwebtoken/jwt';
import bcrypt from '../middleware/bcrypt/bcrypt';
import userServices from '../db/actions/user.services';
async function registerCaptain(req:Request, res:Response) {
    const isAllradyExist=await captainService.getCaptainbyEmail(req.body.email);
    if(isAllradyExist){
        res.status(400).json({
                status:"error",
                message:"Captain already exists",
                errors:{
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
    const hashedPassword=await bcrypt.hashPassword(req.body.password);
    const captain=await captainService.createCaptain({...req.body.captain,password:hashedPassword});
    const token=jwt.getToken(captain._id.toString());
    res.cookie('token',token);
    res.status(200).json({token,message:"registered sucessfully"});
}
async function loginCaptain(req:Request, res:Response) {
    const captain=await captainService.getCaptainWithPassword(req.body.email);
    if(!captain){
        res.status(401).json({message:"Invalid email or password"});
    }
    else{
        const isMatch=await bcrypt.comparePassword(req.body.password,captain.password);
        if(!isMatch){
            res.status(401).json({message:"Invalid email or password"});
        }
        else{
            const token=jwt.getToken(captain._id.toString());
            res.cookie("token",token);
            res.status(200).json({message:"logged in sucessfully"});
        }
    }
}
async function captainProfile(req:Request, res:Response) {
    res.status(200).json({captain:req.body.captain});
}
async function logoutCaptain(req:Request, res:Response) {
    res.clearCookie("token");
    await userServices.createBlackListToken(req.cookies.token);
    res.status(200).json({message:"Logout successful"});
}
export default {
    registerCaptain,
    loginCaptain,
    captainProfile,
    logoutCaptain
}