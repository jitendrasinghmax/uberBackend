import { Router } from "express";
import userValidation from "../middleware/validation/userValidation";
import userController from "../controllers/user.controller";
import authUser from "../middleware/auth/authUser";

export const userRoute=Router();

userRoute.post('/register',userValidation.register,userController.registerUser)
userRoute.post('/login',userValidation.login,userController.loginUser)
userRoute.post('/profile',authUser.authUser,userController.userProfile)
userRoute.post('/logout',authUser.authUser,userController.logoutUser)