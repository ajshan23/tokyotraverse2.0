import mongoose, { Schema } from "mongoose";

const WhishListSchema=new mongoose.Schema({

    productId:{
        type:Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
    
},{timestamps:true})

export const WhishList=mongoose.model("WhishList",WhishListSchema)