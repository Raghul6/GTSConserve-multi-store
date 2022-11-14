import express  from 'express';
import { cities, countries, postcodes, zones } from '../../controllers/user/user.controller';

const loginRouter = express.Router({
  caseSensitive: true,
  strict: true
})

loginRouter.get('/cities',cities)
loginRouter.get('/countries',countries)
loginRouter.get('/zones',zones)
loginRouter.get('/postcodes',postcodes)

export default loginRouter