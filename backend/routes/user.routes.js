import { Router } from "express";
import { createCart, loadCart, loginUser, logoutUser, registerUser, removeCart , addToWhishList, removeFromWhishList, checkWishlist, getWhishList, getOrderList, cancelOrder, processOrder} from "../controllers/user.controller.js";
import {  getAllProducts, getFandom, getLatestProducts, getProductByCategroy, getProductByid, getRelated, getfeatured, searchProducts } from "../controllers/product.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/search").post(searchProducts)
router.route("/category").post(getProductByCategroy)
router.route("/relatedproducts").post(getRelated)




router.route("/finalsubmit").post(verifyJWT,processOrder)


router.route("/getlatestproduct").post(getLatestProducts)
router.route("/getallproducts").post(getAllProducts)
router.route("/getproduct/:productCode").post(getProductByid)
router.route("/getfandom").post(getFandom)
router.route("/getfeatured").post(getfeatured)
router.route("/addtowhishlist/:productId").post(verifyJWT,addToWhishList)
router.route("/removefromwhishlist/:productId").post(verifyJWT,removeFromWhishList)
router.route("/checkinwhishlist/:productId").post(verifyJWT,checkWishlist)
router.route("/getwhishlist").post(verifyJWT,getWhishList)

router.route("/loadcart").post(verifyJWT,loadCart)
router.route("/createcart").post(verifyJWT,createCart)
router.route("/removecart").post(verifyJWT,removeCart)
router.route("/getorderlist").post(verifyJWT,getOrderList)
router.route("/cancelorder").post(verifyJWT,cancelOrder)

export default router;