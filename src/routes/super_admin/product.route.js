import express  from 'express';
import { getProductList } from "../../controllers/super_admin/product/product_type.controller"


import { multerStorage } from "../../utils/helper.util";
import multer from "multer";


import { getCategory,createCategory,updateCategoryStatus,updateCategory } from '../../controllers/super_admin/product/category.controller';

const path = "./uploads/products";

const storage = multerStorage(path);

const uploadImg = multer({ storage: storage }).single("image");



const productRouter = express.Router({
  caseSensitive: true,
  strict: true
})

productRouter.get('/get_product_list',getProductList)



// category 
productRouter.get('/get_category',getCategory)
productRouter.post('/create_category',uploadImg,createCategory)
productRouter.post('/update_category_status',updateCategoryStatus)
productRouter.post('/update_category',uploadImg,updateCategory)


export default productRouter

