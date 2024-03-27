import {v2 as cloudinary} from "cloudinary"

import fs from "fs"

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})


const uploadOnCloudinary=async(localFilePath)=>{
    try {
        if (!localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"})
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}

const deleteFromCloudinary=async(cloundinaryURL)=>{
    try {
        if(!cloudinary) return null
        const parts=cloundinaryURL.split("/")
        const filename=parts[parts.length -1]
        const response= await cloudinary.api.delete_resources(filename,{type:'auto',resource_type:'auto'})
        if (!response) return null
    } catch (error) {
        return null;
    }
}

export {uploadOnCloudinary,deleteFromCloudinary}