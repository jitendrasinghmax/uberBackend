import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import { connectDb } from "./db/db";
import { userRoute } from "./routes/user.route";
import cookieParser from "cookie-parser";
import { captainRoute } from "./routes/captain.route";
import { mapRouter } from "./routes/map.routes";
import { rideRouter } from "./routes/ride.router";

dotenv.config()

export const app=express();

connectDb()

app.use(cors({
    origin: ["http://localhost:5173", "https://uber-frontend-1gxmzfxbm-jitendrasinghmaxs-projects.vercel.app"], // Allow requests from these origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"], // Allow these headers
    credentials: true // Allow cookies to be sent
}));

app.options('*', cors()); // Handle preflight requests

app.use(express.json());

app.use(cookieParser());

app.use('/user',userRoute);
app.use('/captain',captainRoute);
app.use('/map',mapRouter)
app.use('/ride',rideRouter)

app.get('/',(req,resp)=>{
    resp.json("this is backend");
})