import { ObjectId } from "mongoose";

export interface userInterface{
    _id:ObjectId
    email: string;
    password: string;
    socketId: string|null;
    fullName: {
        firstName: string;
        lastName?: string;
    };
}