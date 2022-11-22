import express from 'express';
import responseCode from '../../constants/responseCode';
import messages from '../../constants/messages';
import knex from '../../services/db.service'
import { userValidator } from '../../services/validator.service';
import { userLogin } from "../../models/user/rider.model"

export const login = async (req, res) => {
    try{
    const payload = userValidator(req.body)
    const { user_name, password} = payload
    if (payload.status) {
      const checkPassword = await userLogin (password)
      let query;
      let userId = 0
      // const otp = process.env.USER_OTP || Math.floor(1000 + Math.random() * 9000)
    //   const otp = '1234'
    //   if (!checkPassword.body.length) {
      
    //     const today = format(new Date(), 'yyyy-MM-dd H:i:s')
    //     query = await insertUser(payload, otp, today)
  
    //   } else {
        
    //     // userId = checkPhoneNumber.body[0].id
    //     // query = await updateUserOtp(payload, otp)
    //   }
    
      if (!userId) {
        userId = query.body.body.insertId
      }
  
      if (query.status === responseCode.SUCCESS) {
        res.status(query.status).json({ status: true, user_id: userId, message: messageCode.LOGINMESSAGE.OTP_SENT })
      } else {
        res.status(query.status).json({ status: false, message: query.message })
      }
    } else {
  
      res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: payload.message })
    }
  }
  catch (error) {
    logger.error('Whooops! This broke with error: ', error)
    res.status(500).send('Error!')
  }
  }