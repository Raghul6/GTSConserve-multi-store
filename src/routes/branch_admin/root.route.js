import express  from 'express';

import { loginHandler,loginForm } from "../../controllers/branch_admin/root/root.controller"


const rootRouter = express.Router({
  caseSensitive: true,
  strict: true
})
// rootRouter.get('/login',loginForm)
// rootRouter.post('/login', loginHandler)




export default rootRouter