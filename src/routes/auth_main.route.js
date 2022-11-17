import express from "express";

// Inner routes
import loginRouter from "./auth.route";

const authRouter = express.Router({
  caseSensitive: true,
  strict: true,
});

const defaultRoutes = [
  {
    path: "/",
    route: loginRouter,
  },
  
];

defaultRoutes.forEach((route) => {
  authRouter.use(route.path, route.route);
});

export default authRouter;
