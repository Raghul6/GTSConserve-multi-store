import express from "express";
import fs from "fs";
import multer from "multer";


<<<<<<< HEAD
import { getAllProductType,createProductType,getCategoryType,getAppSettings,updateProductType,updateProductTypeStatus,getvaraitionType,getPlan, searchProductType } from '../../controllers/super_admin/settings/product_type.controller';
import { multerStorage } from '../../utils/helper.util';


=======
// import { getAllProductType,createProductType,getCategoryType,getAppSettings,updateProductTypeStatus,getvaraitionType,getPlan } from '../../controllers/super_admin/settings/product_type.controller';
// import { multerStorage } from '../../utils/helper.util';
import {
  getAllProductType,
  createProductType,
  getCategoryType,
  getCities,
  getAppSettings,
  getAllCountry,
  getAllZone,
  getAllPostCode,
  updateProductTypeStatus,
  updateProductType,
} from "../../controllers/super_admin/settings/product_type.controller";
import { multerStorage } from "../../utils/helper.util";
>>>>>>> b2b5aa1c866c05890709d79383eed2522ae4003f


const settingsRouter = express.Router({
  caseSensitive: true,
  strict: true,
});

const path = "./uploads/products";

const storage = multerStorage(path);

const uploadImg = multer({ storage: storage }).single("image");

// product_type
settingsRouter.get("/get_all_product_type", getAllProductType);
settingsRouter.post("/get_all_product_type/search", searchProductType);

//settingsRouter.post("/search",searchProductType );
settingsRouter.post("/create_product_type", uploadImg, createProductType);
settingsRouter.post("/update_product_type_status", updateProductTypeStatus);
settingsRouter.post("/update_product_type", uploadImg, updateProductType);





// app settings
settingsRouter.get("/app_settings", getAppSettings);


// settingsRouter.get('/varaition_type',getvaraitionType)

// settingsRouter.get('/get_plan',getPlan)




export default settingsRouter;

