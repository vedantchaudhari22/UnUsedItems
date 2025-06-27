import express from 'express';
import cookieParser from 'cookie-parser'
import mongoose, { connect } from 'mongoose';
import cors from 'cors';
import connectDB from './database/db.js';
import dotenv from 'dotenv';
dotenv.config();
import userRoute from "./routes/user.route.js"

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials : true
}))
app.use("/uploads", express.static("uploads"));
app.use("/api/v1/user", userRoute)

// app.get("/home", (_ , res) => {
//     return res.status(200).json({
//         success: true,
//         message: "hello world"
//     })
// })

const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>{
    console.log(`Sever Started Listening At Port No. ${PORT}`);
})
