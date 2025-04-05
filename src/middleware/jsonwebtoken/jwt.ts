import {Request,Response,NextFunction} from 'express'

import jwt from 'jsonwebtoken'

function getToken(_id:string){
    return jwt.sign({_id},process.env.SECRET||"",{expiresIn:"24h"});
}

function verifyToken(_id:string){
    return jwt.verify(_id,process.env.SECRET||"")
}

export default {
    getToken,
    verifyToken
}