import express from "express";

// Inner routes
import loginRouter from "./super_admin/login.route";
import settingsRouter from "./super_admin/settings.router";
import branchRouter from "./super_admin/branch.route";
import placesRouter from "./super_admin/places.router";
import productRouter from "./super_admin/product.route";
import ordersRouter from "./super_admin/orders.route";
import users_subscriptionRouter from "./super_admin/users_subscription.route";
import reportsRouter from "./super_admin/reports.route";
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
    path: "/settings",
    route: settingsRouter,
  },
  {
    path: "/branch",
    route: branchRouter,
  },
  {
    path: "/places",
    route: placesRouter,
  },
  {
    path: "/product",
    route: productRouter,
  },
  {
    path: "/orders",
    route: ordersRouter,
  },
  {
    path: "/users_subscription",
    route: users_subscriptionRouter,
  },
  {
    path: "/reports",
    route: reportsRouter,
  },
  {
    path: "/product",
    route: productRouter,
  }
];

defaultRoutes.forEach((route) => {
  mainRouter.use(route.path, route.route);
});

export default mainRouter;
