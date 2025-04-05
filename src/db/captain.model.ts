import mongoose from "mongoose";

const captainSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    fullName: {
        firstName: { type: String,
                     required: true,
                     minlength: [3,"first name should be at least of 3 characters"]
                    },
        lastName: { type: String,
                     required: true,
                     minlength: [3,"last name should be at least of 3 characters"]
        },
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true,select:false },
    socketId: { type: String, },
    status: { type: String,
                enum: ["active", "inactive"],
                default: "inactive",
                required: true,
                },
    vechial:{
        color:{
            type:String,
            required:true,
            minlength:[3,"color should be at least of 3 characters"]
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,"plate should be at least of 3 characters"]
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,"capacity should be at least of 1"]
        },
    },
    location:{
        ltd:{
            type:Number,
        },
        lng:{
            type:Number,
        }       
    }
})

export default {model:mongoose.model("captain", captainSchema)}