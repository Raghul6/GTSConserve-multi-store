import express  from 'express';
import fs from 'fs'
import multer from 'multer';

import { getAllProductType,createProductType,getCategoryType,getCities,getAppSettings,getAllCountry,getAllZone,getAllPostCode,updateProductTypeStatus } from '../../controllers/super_admin/settings/product_type.controller';
import { multerStorage } from '../../utils/helper.util';

const settingsRouter = express.Router({
  caseSensitive: true,
  strict: true
})

const path = "./uploads/products";
  
const storage = multerStorage(path)

const uploadImg = multer({ storage: storage }).single("image");


// product_type
settingsRouter.get('/get_all_product_type',getAllProductType)

// settingsRouter.post('/create_product_type',createProductType)

//category

settingsRouter.post('/create_product_type',uploadImg,createProductType)
settingsRouter.post('/update_product_type_status',updateProductTypeStatus)



settingsRouter.get('/get_category_type',getCategoryType)

//city
settingsRouter.get('/cities',getCities)
settingsRouter.get('/country',getAllCountry)
settingsRouter.get('/zone',getAllZone)
settingsRouter.get('/post_code',getAllPostCode)

// app settings
settingsRouter.get('/app_settings',getAppSettings)






export default settingsRouter