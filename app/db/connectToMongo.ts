import mongoose from "mongoose";
import { config } from "dotenv";

async function connectToMongo(){
    config();
    let isConnected = false;
    try {
        if(isConnected === false){
            await mongoose.connect(process.env.MONGOURL || "");
            isConnected = true;
            console.log("Connected to MongoDB");
        }
        else{
            console.log("Already connected to MongoDB");
        }
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        throw error;
    }
}

export { connectToMongo };