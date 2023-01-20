import express from "express";

// Inner routes

import settingsRouter from "./super_admin/settings.router";
import branchRouter from "./super_admin/branch.route";
import listRouter from "./super_admin/list.router";
import menuRouter from "./super_admin/menu.route";
import ordersRouter from "./super_admin/orders.route";
import users_subscriptionRouter from "./super_admin/users_subscription.route";
import reportsRouter from "./super_admin/reports.route";
import poRouter from "./super_admin/po.route";
import userRouter from "./super_admin/user.route";

const mainRouter = express.Router({
  caseSensitive: true,
  strict: true,
});

const defaultRoutes = [
  
  {
    path: "/settings",
    route: settingsRouter,
  },
  {
    path: "/branch",
    route: branchRouter,
  },
  {
    path: "/list",
    route: listRouter,
  },
  {
    path: "/menu",
    route: menuRouter,
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
    path: "/po",
    route: poRouter,
  },
  {
    path: "/user",
    route: userRouter,
  }
];

defaultRoutes.forEach((route) => {
  mainRouter.use(route.path, route.route);
});

export default mainRouter;
