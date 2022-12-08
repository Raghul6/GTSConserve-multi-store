import express  from 'express';
import { getusers } from '../../controllers/branch_admin/users/users.controller';



const userRouter = express.Router({
  caseSensitive: true,
  strict: true
})
// userRouter.get('/get_route',getRoute)
userRouter.get('/branch_user',getusers)






export default userRouter