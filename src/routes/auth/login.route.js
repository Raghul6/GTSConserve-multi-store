import express  from 'express';
import { login,verifyUserOtp } from "../../controllers/auth/login.controller"

const authRouter = express.Router({
  caseSensitive: true,
  strict: true
})

authRouter.post('/login', login)
authRouter.post('/verifyotp', verifyUserOtp)

export default authRouter