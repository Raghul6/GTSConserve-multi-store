import express  from 'express';

import { getAllProductType,createProductType } from '../../controllers/super_admin/settings/product_type.controller';


const settingsRouter = express.Router({
  caseSensitive: true,
  strict: true
})

// product_type
settingsRouter.get('/get_all_product_type',getAllProductType)
settingsRouter.post('/create_product_type',createProductType)





export default settingsRouter