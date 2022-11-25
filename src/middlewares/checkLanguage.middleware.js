import responseCode from "../constants/responseCode"
import { createToken, parseJwtPayload, verifyToken } from "../services/jwt.service"

import { User } from '../models/user.model'

export const checkLanguage = async (req, res, next) => {
  
    // const optionalToken = res.locals.optionalToken ?? false
  
    // if (req.headers.authorization) {
    //     const token = req.headers.authorization

    //     if (token) {
    //         const currentTokenPayload = parseJwtPayload(token)
    //         const checkUser = await User.findById(currentTokenPayload.user_id)
    //         if (checkUser) {
    //             try {

    //                 await verifyToken(token, process.env.TOKEN_SECRET)

    //                 req.body.userId = currentTokenPayload.user_id
    //                 req.body.user_language = checkUser.language
    //                 res.set('Authorization', token)
    //                 next()
    //             } catch (error) {
                   
    //                 if (error.isExpired) {
    //                     const { status, refreshToken, _id } = await User.findById(currentTokenPayload.user_id)
    //                     if (status) {
    //                         try {
    //                             await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET)

    //                             const tokens = createToken({ user_id: currentTokenPayload.user_id })
    //                             await User.findByIdAndUpdate(currentTokenPayload.user_id, { refreshToken: tokens.refreshToken }, { new: true })
    //                             // await updateUserToken(tokens.refreshToken, currentTokenPayload.user_id)
    //                             req.body.userId = currentTokenPayload.user_id
    //                             req.body.user_language = checkUser.language
    //                             res.set('Authorization', tokens.token)
    //                             next()
    //                         } catch (error) {
    //                             if (optionalToken) {
    //                                 next()
    //                             } else {
    //                                 res.status(responseCode.FAILURE.UNAUTHORIZED).json({ message: 'Invalid token' })
    //                             }
    //                         }
    //                     } else {
    //                         if (optionalToken) {
    //                             next()
    //                         } else {
    //                             res.status(responseCode.FAILURE.UNAUTHORIZED).json({ message: 'Invalid token' })
    //                         }
    //                     }
    //                 } else {
    //                     if (optionalToken) {
                    
    //                         next()
    //                     } else {
    //                         res.status(responseCode.FAILURE.UNAUTHORIZED).json({ message: 'Invalid token' })
    //                     }
    //                 }
    //             }
    //         } else {
    //             if (optionalToken) {
                   
    //                 next()
    //             } else {
    //                 res.status(responseCode.FAILURE.UNAUTHORIZED).json({ message: 'User not found' })
    //             }
    //         }
    //     } else {
    //         if (optionalToken) {
    //             next()
    //         } else {
    //             res.status(responseCode.FAILURE.UNAUTHORIZED).json({ message: 'Invalid token' })
    //         }
    //     }
    // }
    // else {
        // if (optionalToken) {
        //     next()
        // } else {
            let user_language = ""
            const {language} = req.body
            
            if(language){
                user_language = language
                
            }else{
                user_language = "english"
            }
            req.body.user_language = user_language
            next()
            // res.status(responseCode.FAILURE.UNAUTHORIZED).json({ status: false, message: 'Token Missing in Header' })
        // }
       
    // }

}