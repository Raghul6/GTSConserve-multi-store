import express  from 'express';
import { cities, countries, postcodes, zones,subscription_products, all_categories, all_products } from '../../controllers/user/user.controller';

const loginRouter = express.Router({
  caseSensitive: true,
  strict: true
})

loginRouter.get('/cities',cities)
loginRouter.get('/countries',countries)
loginRouter.get('/zones',zones)
loginRouter.get('/postcodes',postcodes)
loginRouter.get('/products',subscription_products)
loginRouter.get('/categories',all_categories)
loginRouter.get('/product_variations',all_products)
// loginRouter.post('/add_user_address',nonMandatoryToken,authenticateJWT,addUserAddress)

export default loginRouter