import express from "express";
import { getAppSetting } from "../../controllers/user/appsettings.controller";



const appsettingRouter = express.Router({
  caseSensitive: true,
  strict: true,
});

appsettingRouter.get("/app_settings", getAppSetting);


export default appsettingRouter;

