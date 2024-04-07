import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createProduct, getAllProducts, getLatestProducts, getProductByCategroy, removeProductByid } from "../controllers/product.controller.js";

const router = Router();

router.route("/addproduct").post(
  upload.fields([
    {
      name: "product",
      maxCount: 1,
    },
  ]),
  createProduct
);
router.route("/getallproducts").post(getAllProducts)
router.route("/removeproductbyid").post(removeProductByid)
router.route("/getlatestproduct").post(getLatestProducts)
router.route("/category").post(getProductByCategroy)

export default router