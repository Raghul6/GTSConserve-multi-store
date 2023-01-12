import { loginUser, verifyOtp, insertUser, updateUserOtp } from "../../models/user.model"
import responseCode from "../../constants/responseCode"
import messageCode from "../../constants/messages"
import { createToken } from "../../services/jwt.service"
import { loginValidator, verifyOtpValidator } from "../../services/validator.service"
import format from "date-fns/format"
import { userGroup } from "../../constants/controls"
import logger from "../../logger/logger"
import { updateUserToken } from "../../models/user.model"
import knex from "../../services/queryBuilder.service"
export const login = async (req, res) => {
  try{
  const payload = loginValidator(req.body)
 

  const { phoneNumber, fcmToken, device,version} = payload
  // console.log(payload)
  if (payload.status) {
    // const checkPhoneNumber = await loginUser(phoneNumber)

    const users = await knex.select('user_id').from('user')

    const checkPhoneNumber = await knex.select("*").from('user').where({
      'user_phone_number': phoneNumber
    })

    console.log(checkPhoneNumber)

    let query;
    let userId = 0
    const otp = process.env.USER_OTP || Math.floor(1000 + Math.random() * 9000)
    // const otp = 1111
    if (!checkPhoneNumber.length) {
      console.log("inserttttt")
      const today = format(new Date(), 'yyyy-MM-dd H:i:s')
      query = await insertUser(payload, otp, today)
      userId= users.length +1
    } else {
      console.log("updateee")
      query = await updateUserOtp(payload, otp)
      userId = checkPhoneNumber[0].user_id
      
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

export const verifyUserOtp = async (req, res) => {
  try {
    const today = format(new Date(), 'yyyy-MM-dd H:i:s')

    const payload = verifyOtpValidator(req.body)
    const { otp, userId } = payload

    const is_login = await knex.select("*").from('user').where({
      'user_id': userId
    })
    

    if(is_login.length === 0 ){
      return  res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "Invalid User Id" })
    }
    if(is_login[0].refresh_token != null ){
      return  res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "UnAuthorized " })
    }

    if (payload.status === true) {
      const response = await verifyOtp(otp,userId,today)

      if (response.data.length) {
        // const userId=response.data.body[0].language_id
        const tokens = createToken({ user_id:userId})
        
        if (tokens.status) {
          
          await updateUserToken(tokens.refreshToken, userId)
          res.status(responseCode.SUCCESS).json({ status: true, token: tokens.token})
        }
        else {
          res.status(responseCode.FAILURE.INTERNAL_SERVER_ERROR).json({ status: false, message: "Token generation failed" })
        }
      }
      else {
        res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "otp mismatch" })
      }
    }
    else {
      res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: payload.message })
    }
  } catch (error) {
    logger.error('Whooops! This broke with error: ', error)
    res.status(500).send('Error!')
  }
}
// export const login = async (req, res) => {
//   try{
//   const payload = loginValidator(req.body)
 

//   const { phoneNumber, fcmToken, device,version} = payload
//   // console.log(payload)
//   if (payload.status) {
//     // const checkPhoneNumber = await loginUser(phoneNumber)

//     const users = await knex.select('user_id').from('user')

//     const checkPhoneNumber = await knex.select("*").from('user').where({
//       'user_phone_number': phoneNumber
//     })
//     let query;
//     let userId = 0
//     const otp = process.env.USER_OTP || Math.floor(1000 + Math.random() * 9000)
//     if (!checkPhoneNumber.length) {
//       const today = format(new Date(), 'yyyy-MM-dd H:i:s')
//       query = await insertUser(payload, otp, today)
//       userId= users.length +1
//     } else {
//       query = await updateUserOtp(payload, otp)
//       userId = checkPhoneNumber[0].user_id
//     }
//     if (query.status === responseCode.SUCCESS) {
//       res.status(query.status).json({ status: true, user_id: userId, message: messageCode.LOGINMESSAGE.OTP_SENT })
//     } else {
//       res.status(query.status).json({ status: false, message: query.message })
//     }
//   } else {

//     res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: payload.message })
//   }
// }
// catch (error) {
//   logger.error('Whooops! This broke with error: ', error)
//   res.status(500).send('Error!')
// }
// }

// export const verifyUserOtp = async (req, res) => {
//   try {
//     const today = format(new Date(), 'yyyy-MM-dd H:i:s')

//     const payload = verifyOtpValidator(req.body)
//     const { otp, userId } = payload

//     if (payload.status === true) {
//       const response = await verifyOtp(otp,userId,today)

//       if (response.data.length) {
//         // const userId=response.data.body[0].language_id
//         const tokens = createToken({ user_id:userId})
        
//         if (tokens.status) {
          
//           await updateUserToken(tokens.refreshToken, userId)
//           res.status(responseCode.SUCCESS).json({ status: true, token: tokens.token})
//         }
//         else {
//           res.status(responseCode.FAILURE.INTERNAL_SERVER_ERROR).json({ status: false, message: "Token generation failed" })
//         }
//       }
//       else {
//         res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "otp mismatch" })
//       }
//     }
//     else {
//       res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: payload.message })
//     }
//   } catch (error) {
//     logger.error('Whooops! This broke with error: ', error)
//     res.status(500).send('Error!')
//   }
// }
