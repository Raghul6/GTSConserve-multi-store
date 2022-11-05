import express  from 'express';

import { login,test,form } from "../../controllers/super_admin/login.controller"


const authRouter = express.Router({
  caseSensitive: true,
  strict: true
})

authRouter.get('/test', test)
authRouter.get('/form', form)
authRouter.post('/login', login)



export default authRouter