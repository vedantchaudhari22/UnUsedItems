import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All Fields Are Required"
            })
        }
        const user = await User.findOne({ email })
        if(user){
            return res.status(400).json({
                success: false,
                message: "User Already Exists With This Email"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({
            name,
            email,
            password:hashedPassword
        })
        return res.status(201).json({
            success:true,
            message: "Account Created SuccessFully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "Failed To Register"
            
        })
    }
}

export const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success : false,
                message: "All Fields Are Required"
            })
        }
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Incorrect Email Or Password"
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: "Incorrect Email Or Password"
            })
        }
        generateToken(res, user, `Welcome Back ${user.name}`);
        
    } catch (error) {
         console.log(error);
        return res.status(500).json({
            success:false,
            message: "Failed To Login"
            
        })
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message: "Logout succesfully",
            success:true
        })
    } catch (error) {
         console.log(error);
        return res.status(500).json({
            success:false,
            message: "Failed To logout"
            
        })
    }
}

export const getUserProfile = async (req,res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password")
        if(!user){
            return res.status(404).json({
                message:"Profile not found",
                success:false
            })
        }
        return res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to load user"
        })
    }
}