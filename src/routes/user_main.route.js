import express from "express";

// Inner routes
import loginRouter from "./user/login.route";
import productRouter from "./user/product.route";

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
];

defaultRoutes.forEach((route) => {
  mainRouter.use(route.path, route.route);
});

export default mainRouter;
