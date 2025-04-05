import mongoose from "mongoose";

export function connectDb(){
    mongoose.connect(process.env.DB_CONNECT||"").
    then(()=>console.log("db connected")).catch((e)=>console.log(e))
}