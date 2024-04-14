import mongoose, { Schema } from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    product: 
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required:true,
      },
      quantity:{
        type:Number,
        default:1
      },
    owner: {
      type: Schema.Types.ObjectId,
      ref:"User",
      required:true
    },
  },
  { timestamps: true }
);

export const Cart=mongoose.model("Cart",cartSchema)