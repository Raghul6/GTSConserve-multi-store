import express  from 'express';

import { login,test,form,index } from "../../controllers/super_admin/login.controller"


const authRouter = express.Router({
  caseSensitive: true,
  strict: true
})

authRouter.get('/test', test)
authRouter.get('/form', form)
authRouter.get('/index', index)
authRouter.post('/login', login)



export default authRouter