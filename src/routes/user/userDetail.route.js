import express  from 'express';

import { updateUserDetail, getUserAddress,getDeliveryCharge,getFaq,generateHash, updateLanguage, checkCoupon,addFavourite, getFavourite, getPaymentMode, goingRequest,updateLocation, addUserAddress, deleteUserAddress, getUserBranch, getAllPromo, getSinglePromo,updateUsers } from "../../controllers/user/userDetail.controller"
import { nonMandatoryToken,authenticateJWT } from '../../middlewares/authToken.middleware'; 
const userRouter = express.Router({
  caseSensitive: true,
  strict: true
})

 userRouter.get('/user_address',nonMandatoryToken,authenticateJWT,getUserAddress)
 userRouter.get('/user_branch',nonMandatoryToken,authenticateJWT,getUserBranch)
 userRouter.get('/get_all_promo',nonMandatoryToken,authenticateJWT,getAllPromo)
//  userRouter.get('/get_single_promo',nonMandatoryToken,authenticateJWT,getSinglePromo)
 userRouter.post('/add_user_address',nonMandatoryToken,authenticateJWT,addUserAddress)
 userRouter.post('/delete_user_address',deleteUserAddress)
 userRouter.get('/check_coupon',checkCoupon)
 userRouter.post("/update_user",updateUsers)
 userRouter.get("/get_delivery_charge",getDeliveryCharge)       
 userRouter.get("/get_faq",getFaq)       
 userRouter.post("/generate_hash",generateHash)       
//  userRouter.post('/user_details',authenticateJWT,updateUserDetail)
//  userRouter.post('/update_language',authenticateJWT,updateLanguage)
//  userRouter.post('/add_favourite_shop',authenticateJWT,addFavourite)
//  userRouter.get('/favourite_shop_list', authenticateJWT,getFavourite)
//  userRouter.get('/payment_mode', getPaymentMode)
//  userRouter.post('/update_location',authenticateJWT,updateLocation)
//  userRouter.post('/going_request', authenticateJWT, goingRequest)

export default userRouter