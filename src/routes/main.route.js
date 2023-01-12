import express from "express"

// Inner routes
import loginRouter from "./auth/login.route"
import homeRouter from "./home/home.route"
import userRouter from "./user/userDetail.route"
import appSettingRouter from "./appsettings.route"
import orderRouter from "./order/order.route"

import branchRouter from "./branch/branch.router"
import productRouter from "./product/product.route"

const mainRouter = express.Router({
  caseSensitive: true,
  strict: true
})

const defaultRoutes = [
  {
    path: '/auth',
    route: loginRouter
  },
  {
    path: '/home',
    route: homeRouter
  },
  {
    path: '/user',
    route: userRouter
  },
  // {
  //   path: '/user',
  //   route: buddyRouter
  // },
  {
    path: '/',
    route: appSettingRouter
  },
  {
    path: '/order',
    route: orderRouter
  },
  {
    path: '/branch',
    route: branchRouter
  },
  {
    path: '/product',
    route: productRouter
  }
  
]

defaultRoutes.forEach(route => {
  mainRouter.use(route.path, route.route)
})

export default mainRouter
