import {v2 as cloudinary} from "cloudinary"

import fs from "fs"
cloudinary.config({
    cloud_name: 'djmvsz8em',
    api_key: '324891732384222',
    api_secret: 'K8GfEtsReqCJ77-c9IkSLzF8dYM',
    secure: true,
  });

const uploadOnCloudinary=async(localFilePath)=>{
    try {
        if (!localFilePath) return null
        console.log(localFilePath);
        const response = await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"})
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log(error);
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