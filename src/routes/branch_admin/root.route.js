import express  from 'express';

import { getRoot } from "../../controllers/branch_admin/root/root.controller"


const rootRouter = express.Router({
  caseSensitive: true,
  strict: true
})
rootRouter.get('/get_root',getRoot)
// rootRouter.post('/login', loginHandler)




export default rootRouter