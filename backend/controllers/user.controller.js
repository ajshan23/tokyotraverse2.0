import { Cart } from "../models/cart.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
  const options={
    httpOnly:true,
    maxAge: 1000 * 60 * 60 *24 *7,
  }
  return res
    .status(201)
    .cookie("accessToken",accessToken,options)
    .json(
      new ApiResponse(
        200,
        { createdUser,  accessToken: accessToken },
        "User Registered successfully"
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req?.body;

  if ([email,password].some((ele)=>ele.trim()==="")) {
    throw new ApiError(400, "email and password required");
  }
  const user = await User.findOne({ email })

  if (!user) {
    throw new ApiError(400, "no user found");
  }

  
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
  
    if (!isPasswordCorrect) {
        throw new ApiError(400,"password wrong")
    }
  const data = {
    user: {
      id: user.id,
    },
  };
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
  const options={
    httpOnly:true,
    maxAge: 1000 * 60 * 60 *24 *7,
  }
  return res.status(200)
  .cookie("accessToken",accessToken,options)  
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

const logoutUser=asyncHandler(async(req,res)=>{
    res.status(200)
    .cookie("accessToken","",{maxAge:0})
    .json(new ApiResponse(200,{},"User logged out"))
})



const loadCart=asyncHandler(async(req,res)=>{
    
   const user=req?.user;

  const data=await Cart.find({owner:user}).populate("product")

  if (!data) {
    throw new ApiError(400,"no cart found")
  }

  res.status(200)
  .json({
    data,
    message:"successfully fetched",
    statusCode:200
  })
})


const createCart=asyncHandler(async(req,res)=>{
  const user=req?.user;
  const {productId}=req?.body

  const data=await Cart.create({
    product:productId,
    owner:user._id,
  })

  if (!data) {
    throw new ApiError(500,"cart creation failed")
  }

  return res.json(new ApiResponse(201,data,"cart created successfully"))
})


const removeCart=asyncHandler(async(req,res)=>{
  const user=req?.user;
  const {productId,createdAt}=req?.body;

  const data=await Cart.findOneAndDelete({
    owner:user._id,
    createdAt:createdAt,
    product:productId
  })

  if(!data){
    throw new ApiError(500,"no cart found on the entered specs")
  }

  return res.status(202).json("successfully deleted")
})


const finalSubmit=asyncHandler(async(req,res)=>{
  const user=req?.user;
  
  const data=await Cart.deleteMany({
    owner:user._id,
  })

  if (!data) {
    throw new ApiError(500,"delete unsuccessfull")
  }

  return res.json("successfully submitted")
})









export { registerUser, loginUser,logoutUser,loadCart,createCart,removeCart,finalSubmit };
