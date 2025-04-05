import {Request,Response,NextFunction} from 'express'
import bcrypt from 'bcrypt'

async function hashPassword(password:string){
    return await bcrypt.hash(password,10);
}
async function comparePassword(password:string,hash:string){
    return await bcrypt.compare(password,hash);
}
export default {
    hashPassword,
    comparePassword
}