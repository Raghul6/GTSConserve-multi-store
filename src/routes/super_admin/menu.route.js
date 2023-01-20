import express from "express";
import { multerStorage } from "../../utils/helper.util";
import multer from "multer";

import {
  getCategory,
  createCategory,
  updateCategoryStatus,
  updateCategory,
} from "../../controllers/super_admin/menu/category.controller";

// import {
//   getAllProductType,
//   createProductType,
//   updateProductType,
//   updateProductTypeStatus,
// } from "../../controllers/super_admin/product/product_type.controller";


// import { getUnitType } from "../../controllers/super_admin/product/unit_type.controller";

import { getProductList,createProduct,updateProduct ,updateProductStatus} from "../../controllers/super_admin/menu/product_list.controller";

const path = "./uploads/products";

const storage = multerStorage(path);

const uploadImg = multer({ storage: storage }).single("image");

const menuRouter = express.Router({
  caseSensitive: true,
  strict: true,
});

// product_type
// productRouter.get("/get_all_product_type", getAllProductType);
// productRouter.post("/create_product_type", uploadImg, createProductType);
// productRouter.post("/update_product_type_status", updateProductTypeStatus);
// productRouter.post("/update_product_type", uploadImg, updateProductType);

// category
menuRouter.get("/get_category", getCategory);
menuRouter.post("/create_category", uploadImg, createCategory);
menuRouter.post("/update_category_status", updateCategoryStatus);
menuRouter.post("/update_category", uploadImg, updateCategory);


//product list
menuRouter.get("/get_product_list", getProductList);
menuRouter.post("/create_product",uploadImg, createProduct);
menuRouter.post("/update_product",uploadImg, updateProduct);
menuRouter.post("/update_product_status", updateProductStatus);

// // unit type
// productRouter.get("/unit_type", getUnitType);


export default menuRouter;
