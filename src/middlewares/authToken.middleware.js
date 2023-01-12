import responseCode from "../constants/responseCode"
import { createToken, parseJwtPayload, verifyToken } from "../services/jwt.service"
import { userGroup } from "../constants/controls"
import { getAccountModal,getUserToken,updateUserToken } from "../models/user.model"

export const nonMandatoryToken = (req, res, next) => {
  res.locals.optionalToken = true
  next()
}

export const authenticateJWT = async (req, res, next) => {
  const optionalToken = res.locals.optionalToken ?? false
  if(req.headers.authorization)
  {
  const token = req.headers.authorization

  if (token) {
    const currentTokenPayload = parseJwtPayload(token)
    const checkUser = await getAccountModal({ userId: currentTokenPayload.user_id })

    if (checkUser.status == responseCode.SUCCESS) {
      try {

        await verifyToken(token, process.env.TOKEN_SECRET)

        req.body.userId = currentTokenPayload.user_id

        res.set('Authorization', token)
        next()
      } catch (error) {
        if (error.isExpired) {
          const { status, refreshToken ,languageId} = await getUserToken(currentTokenPayload.user_id)
          if (status) {
            try {
              await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET)

              const tokens = createToken({ user_id: currentTokenPayload.user_id, user_group_id: userGroup.USER_GROUP_ID,language_id:languageId })
           
              await updateUserToken(tokens.refreshToken, currentTokenPayload.user_id)
              req.body.userId = currentTokenPayload.user_id
              res.set('Authorization', tokens.token)
              next()
            } catch (error) {
              if (optionalToken) {
                next()
              } else{
                res.status(responseCode.FAILURE.UNAUTHORIZED).json({ message: 'Invalid token' })
              }
            }
          } else {
            if (optionalToken) {
              next()
            } else{
              res.status(responseCode.FAILURE.UNAUTHORIZED).json({ message: 'Invalid token' })
            }
          }
        } else {
          if (optionalToken) {
            next()
          } else {
            res.status(responseCode.FAILURE.UNAUTHORIZED).json({ message: 'Invalid token' })
          }
        }
      }
    } else {
      if (optionalToken) {
        next()
      } else {
        res.status(responseCode.FAILURE.UNAUTHORIZED).json({ message: 'User not found' })
      }
    }
  } else {
    if (optionalToken) {
      next()
    } else {
      res.status(responseCode.FAILURE.UNAUTHORIZED).json({ message: 'Invalid token' })
    }
  }
}
else{
  if (optionalToken) {
    next()
  } else {
    res.status(responseCode.FAILURE.UNAUTHORIZED).json({ status:false,message: 'Token Missing in Header' })
  }
}
}