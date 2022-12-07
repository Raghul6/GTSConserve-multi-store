import express from "express";
import multer from "multer";
import { multerStorage } from "../../utils/helper.util";

import { getPlan } from "../../controllers/super_admin/settings/plan.controller";

import { createAppsettings, getAppSettings } from "../../controllers/super_admin/settings/app_settings.controller";



const settingsRouter = express.Router({
  caseSensitive: true,
  strict: true,
});

const path = "./uploads/products";

const storage = multerStorage(path);

const uploadImg = multer({ storage: storage }).single("image");

//plan
settingsRouter.get("/get_plan", getPlan);

// app settings
settingsRouter.get("/app_settings", getAppSettings);
settingsRouter.post("/create_appsettings", createAppsettings);



export default settingsRouter;
