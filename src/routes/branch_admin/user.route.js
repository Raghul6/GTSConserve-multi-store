import express  from 'express';
import { getusers,getSingleUser,getAddUser,createUser,newSubscription,newAddOn,createAdditional,editAdditional } from '../../controllers/branch_admin/users/users.controller';



const userRouter = express.Router({
  caseSensitive: true,
  strict: true
})
// userRouter.get('/get_route',getRoute)
userRouter.get('/branch_user',getusers)
userRouter.get('/single_user',getSingleUser)

// additional orders
userRouter.post('/create_additional',createAdditional)
userRouter.post('/edit_additional',editAdditional)

// add user
userRouter.get('/get_add_users',getAddUser)
userRouter.post('/create_user',createUser)

// new subscription product
userRouter.post('/new_subscription',newSubscription)
userRouter.post('/new_add_on',newAddOn)



export default userRouter