import express  from 'express';
import { appSetting } from "../controllers/appSetting.controller"

const appSettingRouter = express.Router({
  caseSensitive: true,
  strict: true
})

appSettingRouter.get('/app_settings',appSetting)

export default appSettingRouter