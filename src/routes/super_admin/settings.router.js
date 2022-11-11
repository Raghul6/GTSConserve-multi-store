import express  from 'express';

import { getAllProductType,createProductType,getCategoryType } from '../../controllers/super_admin/settings/product_type.controller';


const settingsRouter = express.Router({
  caseSensitive: true,
  strict: true
})

// product_type
settingsRouter.get('/get_all_product_type',getAllProductType)
settingsRouter.post('/create_product_type',createProductType)
settingsRouter.post('/get_category_type',getCategoryType)





export default settingsRouter