import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderStatus:{
        type:String,
        enum: ['placed', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'placed',
    }
  },
  { timestamps: true }
);

export const Order=mongoose.model("Order",orderSchema)