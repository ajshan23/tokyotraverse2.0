import { Cart } from "../models/cart.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { WhishList } from "../models/WhishList.model.js";
import { Order } from "../models/order.model.js";

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

  if (check) {
    check.quantity += quantity;
    await check.save();

    return res.status(201).json({
      message: "updated successfull",
      success: true,
    });
  } else {
    const data = await Cart.create({
      product: productId,
      owner: user._id,
      quantity: quantity,
    });

    if (!data) {
      throw new ApiError(500, "cart creation failed");
    }

    return res.json(new ApiResponse(201, data, "cart created successfully"));
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
    })
  } else {
    await Cart.findOneAndDelete({
      owner: user._id,
      product: productId,
    }).then(()=>{
      return res.status(201).json({
        message:"cart removed successfully",
        success:true
      })
    }).catch(()=>{
      return res.status(201).json({
        message:"cart removel unsuccessfull",
        success:false
    })
    })
  }
});

const finalSubmit = asyncHandler(async (req, res) => {
  const user = req?.user;
let orderDatas=[];
  const cartData=await Cart.find({owner:user._id})
  for (const element of cartData) {
    let productId= element.product
    let quantity=element.quantity
    let owner=user._id
    let orderData= await Order.create({
      product:productId,
      quantity:quantity,
      owner:owner
    })
    orderDatas.push(orderData)
  }

  await Cart.deleteMany({
    owner:user._id
  }).catch((err)=>{
    console.log(err);
    return res.json({
      message:"unable delete",
      success:false
    })
  }
  )  
  res.json({
    message:"successfull",
    success:true,
    orderDatas
  })


});

const addToWhishList = asyncHandler(async (req, res) => {
  const productId = req.body.productId;
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
  const productId = req.body.productId;
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
  const productId = req.body.productId;
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

const getOrderList=asyncHandler(async(req,res)=>{
  const userId=req?.user._id;
  const data=await Order.find({
    owner:userId
  })

  return res.status(201).json(new ApiResponse(201,data,"Order list fetched"))
})

export {
  registerUser,
  loginUser,
  logoutUser,
  loadCart,
  createCart,
  removeCart,
  finalSubmit,
  addToWhishList,
  removeFromWhishList,
  checkWishlist,
  getWhishList,
  getOrderList
};
