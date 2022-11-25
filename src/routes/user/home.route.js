import express  from 'express';
import { getBanner } from '../../controllers/user/home.controller';
// import {getProducts, getCategories, getProduct_type } from '../../controllers/user/product.controller';
// import { addUserAddress } from '../../controllers/user/userdetails.controller';
// import { nonMandatoryToken,authenticateJWT } from '../../middlewares/authToken.middleware'; 


const homeRouter = express.Router({
  caseSensitive: true,
  strict: true
})

homeRouter.get('/getbanner',getBanner)


// userdetailsRouter.get('/products',getProducts)

// userdetailsRouter.get('/getproducttype',getProduct_type)


export default homeRouter