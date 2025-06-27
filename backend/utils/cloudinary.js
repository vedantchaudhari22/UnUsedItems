import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
//import upload from './multer';
dotenv.config({});

cloudinary.config({
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    cloud_name: process.env.CLOUD_NAME
})

export const uploadMedia = async (file) => {
    try {
        const uploadResponse = await cloudinary.uploader.upload(file, {
            // folder: 'e-learning',
            resource_type: 'auto' // Automatically detect the resource type (image, video, etc.)
        });

        return uploadResponse;
    } catch (error) {
        console.log(error);
    }
}

export const deleteMediaFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.log(error);
    }
}

export const deletePhotoFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId, {
            resource_type: 'video'
        });
    } catch (error) {
        console.log(error);
        
    }
}