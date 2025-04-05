import { Server } from "socket.io";
import http from "http";
import { userModel } from "./db/user.model";
import captainModel from "./db/captain.model";

let io: Server;

export function initializeSocket(server: http.Server) {
    io = new Server(server, {
        cors: {
            origin: '*', // Allow requests from these origins
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log(`Socket connected: ${socket.id}`);
        socket.on("join",async (data) => {
            const {userId,userType}=data;
            
            if(userType==="user"){
                await userModel.findByIdAndUpdate(userId,{socketId:socket.id})
            }
            if(userType==="captain"){
                await captainModel.model.findByIdAndUpdate(userId,{socketId:socket.id})
            }
            
        });
        socket.on("update-location-captain",async(data)=>{
            const {userId,location}=data;
            console.log(data)
            if(!userId){
                socket.emit('error',{message:"captin id not found"});
                return;
            }
            if(!location||!location.ltd||!location.lng){
                return socket.emit('error',{message:"invalid location data"})
            }
            const result=await captainModel.model.findByIdAndUpdate(userId,{
                location:{
                    ltd:location.ltd,
                    lng:location.lng
                }
            })
        })
        socket.on('captain-location',async(data)=>{
            const {socketId,location}=data;
            console.log("captain",data)

            if(!location||!location.lat||!location.lng){
                return socket.emit('error',{message:"invalid location data"})
            }
            sendMessageToSocketId(socketId,{
                event:"update-location",
                data:{
                    location:{
                        lat:location.lat,
                        lng:location.lng
                    }
                }
            })
        })
        socket.on('user-location',async(data)=>{
            const {socketId,location}=data;
           
            if(!location||!location.lat||!location.lng){
                return socket.emit('error',{message:"invalid location data"})
            }
            console.log("user",data)
            sendMessageToSocketId(socketId,{
                event:"update-location",
                data:{
                    location:{
                        lat:location.lat,
                        lng:location.lng
                    }
                }
            })
        })
        socket.on("disconnect", () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });
}

export function sendMessageToSocketId(socketId: string, message: any) {
    if (io) {
        io.to(socketId).emit(message.event, message.data);
    } else {
        console.error("Socket.io is not initialized.");
    }
}
