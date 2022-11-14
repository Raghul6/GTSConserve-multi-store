import express  from 'express';

import { getAllProductType,createProductType,getCategoryType,getCities,getAppSettings,getAllCountry,getAllZone,getAllPostCode } from '../../controllers/super_admin/settings/product_type.controller';


const settingsRouter = express.Router({
  caseSensitive: true,
  strict: true
})

// product_type
settingsRouter.get('/get_all_product_type',getAllProductType)
settingsRouter.post('/create_product_type',createProductType)

//category
settingsRouter.get('/get_category_type',getCategoryType)

//city
settingsRouter.get('/get_cities',getCities)
settingsRouter.get('/country',getAllCountry)
settingsRouter.get('/zone',getAllZone)
settingsRouter.get('/post_code',getAllPostCode)

// app settings
settingsRouter.get('/app_settings',getAppSettings)






export default settingsRouter