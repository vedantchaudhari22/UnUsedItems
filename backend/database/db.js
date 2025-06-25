import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB Connected Successfully`)
            
    } catch (error) {
        console.log(`Error thrown is catched :- ${error}`);
    }
}

export default connectDB;

