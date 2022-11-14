import express  from 'express';
import { getProductList } from "../../controllers/super_admin/product/product_type.controller"


const productRouter = express.Router({
  caseSensitive: true,
  strict: true
})

productRouter.get('/get_product_list',getProductList)


export default productRouter