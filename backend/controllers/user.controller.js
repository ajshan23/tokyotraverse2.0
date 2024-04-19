import { Cart } from "../models/cart.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { WhishList } from "../models/WhishList.model.js";
import { Order } from "../models/order.model.js";
import mongoose from "mongoose";
import { Product } from "../models/product.model.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req?.body;

  if ([username, email, password].some((sin) => sin?.trim() === "")) {
    throw new ApiError(400, "All fields are compelsory");
  }

  const existedUser = await User.findOne({ email: email });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exits");
  }
  const user = await User.create({
    email: email,
    password: password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering new user");
  }
  const data = {
    user: {
      id: user.id,
    },
  };
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
  const options = {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  };
  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        { createdUser, accessToken: accessToken },
        "User Registered successfully"
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req?.body;

  if ([email, password].some((ele) => ele.trim() === "")) {
    throw new ApiError(400, "email and password required");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "no user found");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "password wrong");
  }
  const data = {
    user: {
      id: user.id,
    },
  };
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
  const options = {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: user,
          accessToken,
        },
        "user logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  res
    .status(200)
    .cookie("accessToken", "", { maxAge: 0 })
    .json(new ApiResponse(200, {}, "User logged out"));
});

const loadCart = asyncHandler(async (req, res) => {
  const user = req?.user;

  const data = await Cart.find({ owner: user }).populate("product");

  if (!data) {
    throw new ApiError(400, "no cart found");
  }

  res.status(200).json({
    data,
    message: "successfully fetched",
    statusCode: 200,
  });
});

const createCart = asyncHandler(async (req, res) => {
  const user = req?.user;
  const { productId, quantity } = req?.body;

  const check = await Cart.findOne({
    product: productId,
    owner: user._id,
  });
  
  const product = await Product.findOne({_id:productId});
  if (check) {
    if (product.stock >= (check.quantity+quantity)) {
      check.quantity += quantity;
      await check.save();
      return res.status(201).json({
        message: "updated successfull",
        success: true,
      });
    }
    else{
      return res.status(400).json({
        message: "out of stock",
        success: false,
      });
    }

   
  } else {
    if (product.stock>=quantity) {
      const data = await Cart.create({
        product: productId,
        owner: user._id,
        quantity: quantity,
      });
      if (!data) {
        throw new ApiError(500, "cart creation failed");
      }
  
      return res.json(new ApiResponse(201, data, "cart created successfully"));
    }else{
      return res.status(400).json({
        message: "out of stock",
        success: false,
      });
    }
   

   
  }
});

const removeCart = asyncHandler(async (req, res) => {
  const user = req?.user;
  const { productId } = req?.body;

  const data = await Cart.findOne({
    owner: user._id,
    product: productId,
  });
  if (!data) {
    // throw new ApiError(500, "no cart found on the entered specs");
    return res.status(202).json({
      message: "no data found ",
      success: false,
    });
  }

  if (data.quantity > 1) {
    data.quantity -= 1;
    data.save().then(() => {
      return res.status(202).json({
        message: "quantity decreased successfully",
        success: true,
      });
    });
  } else {
    await Cart.findOneAndDelete({
      owner: user._id,
      product: productId,
    })
      .then(() => {
        return res.status(201).json({
          message: "cart removed successfully",
          success: true,
        });
      })
      .catch(() => {
        return res.status(201).json({
          message: "cart removel unsuccessfull",
          success: false,
        });
      });
  }
});

const addToWhishList = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;
  console.log(req.user._id);

  if (!productId) {
    throw new ApiError("product id is required");
  }

  if (!userId) {
    throw new ApiError("invalid user");
  }

  const check = await WhishList.findOne({
    productId: productId,
    userId: userId,
  });
  if (check) {
    console.log("check has executed");
    return res.status(500).json({
      message: "already exist in your whishlist",
      success: false,
    });
  }
  const whishData = await WhishList.create({
    productId,
    userId,
  });

  res.status(200).json({
    message: "added to whishList",
    success: true,
    whishData: whishData,
  });
});

const removeFromWhishList = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;
  await WhishList.findOneAndDelete({
    productId: productId,
    userId: userId,
  })
    .then(() =>
      res.status(200).json({
        message: "removed from whishList",
        success: true,
      })
    )
    .catch(() =>
      res.status(404).json({
        message: "unable to remove from whishList",
        success: false,
      })
    );
});

const checkWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;
  const check = await WhishList.findOne({
    productId: productId,
    userId: userId,
  });
  if (check) {
    return res.status(200).json({
      message: "already exists",
      success: true,
    });
  } else {
    return res.status(201).json({
      message: "no data found",
      success: false,
    });
  }
});

const getWhishList = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const data = await WhishList.find({
    userId: userId,
  }).populate("productId");
  return res
    .status(201)
    .json(new ApiResponse(201, data, "liked list fetched "));
});

// const orderCreation = asyncHandler(async (req, res) => {
//   const user = req?.user;
//   const { address, phoneNumber, pincode } = req?.body;
//   if ([address, phoneNumber, pincode].some((fi) => fi.trim() === "")) {
//     throw new ApiError(400, "all fields required");
//   }
//   let orderDatas = [];
//   const cartData = await Cart.find({ owner: user._id });

//   if (!cartData) {
//     throw new ApiError(400, "no cart found");
//   }

//   const session = await mongoose.startSession();
//   session.startTransaction();
  

//   try {
//     for (const element of cartData) {
//       let productId = element.product;
//       let quantity = element.quantity;
//       let owner = user._id;
//       await Product.updateOne(
//         { _id: productId },
//         { $inc: { stock: -quantity } },
//         { runValidators: true, session }
//       );
//       let orderData = await Order.create(
//         [
//           {
//             product: productId,
//             quantity: quantity,
//             owner: owner,
//             address: address,
//             phoneNumber: Number.parseInt(phoneNumber),
//             pincode: Number.parseInt(pincode),
//           },
//         ],
//         { session }
//       );
//       orderDatas.push(orderData);
//     }
//     await Cart.deleteMany({ owner: user._id }, { session });
//     await session.commitTransaction();
//     session.endSession();
//     res.json({
//       message: "successfull",
//       success: true,
//       orderDatas,
//     });
//   } catch (error) {
//     console.log(error);
//     await session.abortTransaction();
//     session.endSession();
//     res.status(500).json({
//       message: "something went wrong",
//       success: false,
//     });
//   }
// });


const processOrder=asyncHandler(async(req,res)=>{
  const userId=req?.user?._id
 
  if (!userId) {
    throw new ApiError(400, "invalid user");
  }
  let errorData=[];

  const session=await mongoose.startSession();
  
  session.startTransaction();
  try {
    const cartItems=await Cart.find({owner:userId}).session(session)
    
    for(const item of cartItems){
      const product=await Product.findById(item.product).session(session);
      const newStock=product.stock-item.quantity;

      if (newStock<0) {
        errorData.push(`Insufficient stock for product ${product.name}`)
        throw new Error(`Insufficient stock for product ${product.name}`)
      }
      await Product.findByIdAndUpdate(item.product,{stock:newStock}).session(session);
      const order= new Order({
        product:item.product,
        quantity:item.quantity,
        owner:userId,
        address:req.body.address,
        phoneNumber:req.body.phoneNumber,
        pincode:req.body.pincode,
      });
      await order.save({session});
    }
    await Cart.deleteMany({owner:userId}).session(session);

   await session.commitTransaction();
   session.endSession();  
   console.log("Order processed successfully");
   res.json({
    message: "successfull",
    success: true,
  });

  } catch (error) {

    await session.abortTransaction();
    session.endSession();
    res.json({
      message: "unsuccessful",
      success: false,
      data:errorData
    });
    console.error('Transaction aborted', error );
  }
})


const getOrderList = asyncHandler(async (req, res) => {
  const userId = req?.user._id;

  const data = await Order.find({
    owner: userId,
  })
    .populate("product")
    .sort({ createdAt: -1 });

  return res.status(201).json(new ApiResponse(201, data, "Order list fetched"));
});

const cancelOrder = asyncHandler(async (req, res) => {
  const orderId = req?.body.orderId;

  await Order.updateOne(
    { _id: orderId },
    { $set: { orderStatus: "cancelled" } },
    { runValidators: true }
  )
    .then(() =>
      res.json({
        message: "order cancelled",
        success: true,
      })
    )
    .catch(() => {
      res.json({
        message: "order cancellation is not success",
        success: false,
      });
    });
});

const getAllOrder = asyncHandler(async (req, res) => {
  await Order.find({})
    .populate("product owner")
    .then((response) =>
      res.json(new ApiResponse(201, response, "Order list fetched"))
    )
    .catch((err) => {
      console.log(err);
      res.json({
        message: "order fetching cancelled",
        success: false,
      });
    });
});

const updateOrder = asyncHandler(async (req, res) => {
  const { updateCategory, orderId } = req?.body;
  await Order.findOneAndUpdate(
    { _id: orderId },
    { $set: { orderStatus: updateCategory } },
    { runValidators: true }
  )
    .then(() =>
      res.json({
        message: "Order updated successfully",
        success: true,
      })
    )
    .catch(() =>
      res.json({
        message: "order Updation got cancelled",
        success: false,
      })
    );
});

const blockOrder = asyncHandler(async (req, res) => {
  const { orderId } = req?.body;
  await Order.findOneAndUpdate(
    { _id: orderId },
    { $set: { orderStatus: "blocked" } },
    { runValidators: true }
  )
    .then(() =>
      res.json({
        message: "Order updated successfully",
        success: true,
      })
    )
    .catch(() =>
      res.json({
        message: "order Updation got cancelled",
        success: false,
      })
    );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  loadCart,
  createCart,
  removeCart,
 
  addToWhishList,
  removeFromWhishList,
  checkWishlist,
  getWhishList,
  getOrderList,
  cancelOrder,
  getAllOrder,
  updateOrder,
  blockOrder,
  processOrder
};
