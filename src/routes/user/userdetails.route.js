import express  from 'express';
// import {getProducts, getCategories, getProduct_type } from '../../controllers/user/product.controller';
import { addAddress, deleteUser, deleteUseraddress, editAddress, getAddress, getUser, updateUser, } from '../../controllers/user/userdetails.controller';
import {authenticateJWT } from '../../middlewares/authToken.middleware'; 


const userdetailsRouter = express.Router({
  caseSensitive: true,
  strict: true
})
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
  filename: function (req, file, cb) {
    // console.log(req.headers.authorization)
    let index = file.mimetype.indexOf('/') + 1
    cb(null, Date.now() + "." + file.mimetype.slice(index));
  }
});

const uploadImg = multer({storage: storage}).single('image');

userdetailsRouter.post('/add_address',addAddress)
userdetailsRouter.get('/get_address',getAddress)
userdetailsRouter.post("/edit_address",editAddress)
userdetailsRouter.get('/get_users',getUser)
userdetailsRouter.post('/update_users',uploadImg,updateUser)
userdetailsRouter.get('/delete_useraddress',deleteUseraddress)






// userdetailsRouter.get('/products',getProducts)

// userdetailsRouter.get('/getproducttype',getProduct_type)


export default userdetailsRouter