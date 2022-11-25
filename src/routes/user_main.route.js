import express from "express";

// Inner routes
import loginRouter from "./user/login.route";
import productRouter from "./user/product.route";
<<<<<<< HEAD
import userRouter from "./user/userdetails.route";
import appsettingRouter from "./user/general.route";
<<<<<<< HEAD
=======
=======
import subscriptionRouter from "./user/subscription.route";
>>>>>>> b21080a0529991ab9750f4061f75056c9407ea92
>>>>>>> 4aa44f2ab49c8b14ecabd0b90e0c8836b97ccb9a

const mainRouter = express.Router({
  caseSensitive: true,
  strict: true,
});
 
const defaultRoutes = [
  {
    path: "/auth",
    route: loginRouter,
  },
  {
    path: "/product",
    route: productRouter,
  },
  {
    path: "/subscription",
    route: subscriptionRouter,
  },
];

defaultRoutes.forEach((route) => {
  mainRouter.use(route.path, route.route);
});

export default mainRouter;
