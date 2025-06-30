import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
// const URI = "mongodb://127.0.0.1:27017/"
const URI = process.env.MONGODB_URI
// console.log("Db url",process.env.MONGODB_URI );

export const connectDB = async() => {
    try {
        await mongoose.connect(URI)
        console.log("connected Successfully");
        
    } catch (error) {
        console.log(error);
        
    }
}

