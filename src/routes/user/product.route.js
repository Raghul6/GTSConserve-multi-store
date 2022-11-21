import express  from 'express';
import {getProducts, getCategories } from '../../controllers/user/product.controller';

const productRouter = express.Router({
  caseSensitive: true,
  strict: true
})

productRouter.get('/get_categories',getCategories)

productRouter.get('/products',getProducts)



export default productRouter