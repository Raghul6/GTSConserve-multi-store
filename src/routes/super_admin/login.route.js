import express  from 'express';

import { loginHandler,loginForm } from "../../controllers/super_admin/auth/login.controller"


const authRouter = express.Router({
  caseSensitive: true,
  strict: true
})
authRouter.get('/login',loginForm)
authRouter.post('/login', loginHandler)




export default authRouter