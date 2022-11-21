import express from "express";

// Inner routes
import loginRouter from "./user/login.route";
import productRouter from "./user/product.route";
import subscriptionRouter from "./user/subscription.route";

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
