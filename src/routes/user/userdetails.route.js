import express from 'express';
import { addUserAddress } from '../../controllers/user/userDetail.controller';

const userRouter = express.Router({
    caseSensitive: true,
    strict: true
  })


userRouter.post('/add_user_address',addUserAddress)




  export default userRouter;