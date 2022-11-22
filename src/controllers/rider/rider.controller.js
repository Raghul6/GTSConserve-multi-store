import express from 'express';
import responseCode from '../../constants/responseCode';
import messages from '../../constants/messages';
import knex from '../../services/db.service'
import { userValidator } from '../../services/validator.service';
import { loginUser,insertRider } from "../../models/user/user.model"

export const login = async (req, res) => {
  try{
  // const payload = userValidator(req.body)
  const { user_name, password} = payload
  if (payload) {
    const checkPhoneNumber = await loginUser(password)
    let query;
    let userId = 0
    // const otp = process.env.USER_OTP || Math.floor(1000 + Math.random() * 9000)
    // const otp = '1234'
    if (!checkPhoneNumber.body.length) {
    
      const today = format(new Date(), 'yyyy-MM-dd H:i:s')
      query = await insertRider(payload)

    } 
    // else {
      
    //   userId = checkPhoneNumber.body[0].id
    //   query = await updateUserOtp(payload, otp)
    // }
  
    // if (!userId) {
    //   userId = query.body.body.insertId
    // }

    if (query.status === responseCode.SUCCESS) {
      res.status(query.status).json({ status: true, messages: "Failed...." })
    } else {
      res.status(query.status).json({ status: false, message: "pls check" })
    }
  } else {

    res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "error" })
  }
}
catch (error) {
  logger.error('Whooops! This broke with error: ', error)
  res.status(500).send('Error!')
}
}