import mongoose, { Mongoose } from "mongoose";

const userSchema=new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minlength:[3,"First name must of at least 3 character"]
        },
        lastName:{
            type:String,
            required:true,
            minlength:[3,"Last name must of at least 3 character"]
        }
    },
    email:{
        type:String,
        required:true,
        minlength:[5,"Email name must of at least 5 character"]
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:[5,"password must be of at least 6 character"]
    },
    socketId:{
        type:String,
    }
})

export const userModel=mongoose.model('user',userSchema);