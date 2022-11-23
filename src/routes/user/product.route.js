import express  from 'express';
import {getProducts, getCategories, getProduct_type } from '../../controllers/user/product.controller';

const productRouter = express.Router({
  caseSensitive: true,
  strict: true
})

productRouter.get('/get_categories',getCategories)

productRouter.get('/products',getProducts)

productRouter.get('/getproducttype',getProduct_type)


export default productRouter