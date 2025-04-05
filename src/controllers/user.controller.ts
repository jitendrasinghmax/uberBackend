import userServices from "../db/actions/user.services";
import { Request,Response,NextFunction } from "express";
import bcrypt from "../middleware/bcrypt/bcrypt";
import jwt from "../middleware/jsonwebtoken/jwt";
    
const registerUser=async function(req:Request,resp:Response,next:NextFunction){
    const isAllradyExist=await userServices.getUserbyEmail(req.body.email);
    if(isAllradyExist){
        resp.status(400).json({
            status: "error",
            message: "allrady exist",
            errors:{
                email: false,
                password: true, 
                fullName: {
                    firstName: true,
                    lastName: true
                }
            }
        });
        return;
    }
    const hashedPassword=await bcrypt.hashPassword(req.body.password)
    const user:any=await userServices.createUser({
                                            fullName:{
                                                firstName:req.body.firstName,
                                                lastName:req.body.lastName
                                            },
                                            email:req.body.email,
                                            password:hashedPassword
                                        });
    const token=jwt.getToken(user._id);
    resp.cookie("token", token, {
        httpOnly: true, // Prevent access via JavaScript
        secure: true, // Ensure the cookie is sent over HTTPS
        sameSite: 'none', // Use lowercase 'none' to match the expected type
    });
    resp.status(200).json({
        status: "success",
        message: "User registered successfully",
        token
    });
}

const loginUser=async function(req:Request,resp:Response,next:NextFunction){
    const user=await userServices.getUserWithPassword(req.body.email);
    if(!user){
        resp.status(401).json({
            status: "error",
            message: "Invalid email or password"
        });
    }
    else{
        const isMatch=await bcrypt.comparePassword(req.body.password,user.password);
        if(!isMatch){
            resp.status(401).json({
                status: "error",
                message: "Invalid email or password"
            });
        }
        else{
            const token=jwt.getToken(user._id.toString());
            resp.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            });
            resp.status(200).json({
                status: "success",
                message: "Login successful",
                token
            });
        }
    }
}

const userProfile=async function(req:Request,resp:Response,next:NextFunction){
    resp.status(200).json({user:req.body.user,message:"logged in sucessfully"});
}

const logoutUser=async function(req:Request,resp:Response,next:NextFunction){
    resp.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    });
    await userServices.createBlackListToken(req.cookies.token);
    resp.status(200).json({
        status: "success",
        message: "Logout successful"
    });
}

export default {
    registerUser,
    loginUser,
    userProfile,
    logoutUser
}