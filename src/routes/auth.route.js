import express  from 'express';

import { loginHandler,loginForm,logoutHandler,getProfile ,updateProfile ,getChangePassword,updateChangePassword} from "../controllers/auth/auth.controller"
import { authenticateJWTSession } from '../middlewares/authToken.middleware';

import { multerStorage } from '../utils/helper.util';
import multer from 'multer';
 
const path = "./uploads/admin_users";

const storage = multerStorage(path);

const uploadImg = multer({ storage: storage }).single("image");

const authRouter = express.Router({
  caseSensitive: true,
  strict: true
})
authRouter.get('/login',loginForm)
authRouter.post('/login', loginHandler)
authRouter.get('/logout', logoutHandler)

authRouter.get('/get_profile',authenticateJWTSession, getProfile)
authRouter.post('/update_profile',authenticateJWTSession,uploadImg, updateProfile)

authRouter.get('/get_change_password', getChangePassword)
authRouter.post('/update_change_password', updateChangePassword)




export default authRouter