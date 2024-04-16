import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createProduct, getAllProducts, getLatestProducts, getProductByCategroy, removeProductByid } from "../controllers/product.controller.js";
import { blockOrder, getAllOrder, updateOrder } from "../controllers/user.controller.js";

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


router.route("/getorderlist").post(getAllOrder)
router.route("/updateorder").post(updateOrder)
router.route("/blockorder").post(blockOrder)

export default router