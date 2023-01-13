import express from "express";

import { addFeedback, getAppSetting,getFeedBack  } from "../../controllers/user/general.controller";

import { authenticateJWT,nonMandatoryToken } from "../../middlewares/authToken.middleware";




const appsettingRouter = express.Router({
  caseSensitive: true,
  strict: true,
});

appsettingRouter.get("/app_settings", getAppSetting);
appsettingRouter.get("/get_feed_backs", getFeedBack);
appsettingRouter.post("/add_feed_backs", authenticateJWT,addFeedback);

export default appsettingRouter;

