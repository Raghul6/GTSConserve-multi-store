import express from 'express';
<<<<<<< HEAD
import { addUserAddress } from '../../controllers/user/userDetail.controller';
=======
import { addUserAddress,getAddress,editAddress,getUser,updateUser,deleteUseraddress, RemoveOrder, } from '../../controllers/user/userDetail.controller';
>>>>>>> 4d9893ab6448a49c3a734c8584b23afb51751a80

const userRouter = express.Router({
    caseSensitive: true,
    strict: true
  })


<<<<<<< HEAD
userRouter.post('/add_user_address',addUserAddress)
=======
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
     }
  });
  
  const uploadImg = multer({storage: storage}).single('image');
  
  // userRouter.post('/add_address',addUserAddress)
  userRouter.get('/get_address',getAddress)
  userRouter.post("/edit_address",editAddress)
  userRouter.get('/get_users',getUser)
  userRouter.post('/update_users',uploadImg,updateUser)
  userRouter.get('/delete_useraddress',deleteUseraddress)
  userRouter.post('/add_user_address',addUserAddress)
  userRouter.post('/remove_orders',RemoveOrder)

>>>>>>> 4d9893ab6448a49c3a734c8584b23afb51751a80




  export default userRouter;