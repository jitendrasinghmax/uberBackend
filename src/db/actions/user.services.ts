import { UserType } from "../../controllers/zod.validation";
import { userModel } from "../user.model";
import BlacklistToken from "../balcklistToken.model";

async function createUser(user:UserType){
    const result=await userModel.create(user);
    return result;
}
async function getUser(_id:string){
    const result=await userModel.findOne({_id});
    return result;
}
async function getUserbyEmail(email:string){
    const result=await userModel.findOne({email});
    return result;
}

function getUserWithPassword(email:string){
    const result=userModel.findOne({email}).select('+password').exec();
    return result;
}

async function createBlackListToken(token:string){
    const result=await BlacklistToken.create({token});
    return result;
}

async function getBlackListToken(token:string){
    const result=await BlacklistToken.findOne({token});
    return result;
}

export default {
    createUser,
    getUser,
    getUserWithPassword,
    createBlackListToken,
    getBlackListToken,
    getUserbyEmail
}