import express from 'express';
import { addUserAddress,getAddress,editAddress,getUser,updateUser,deleteUseraddress, RemoveOrder, } from '../../controllers/user/userDetail.controller';

const userRouter = express.Router({
    caseSensitive: true,
    strict: true
  })

  import multer from "multer";

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





  export default userRouter;