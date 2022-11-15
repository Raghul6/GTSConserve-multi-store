import express from "express";

// Inner routes
import loginRouter from "./super_admin/login.route";
import settingsRouter from "./super_admin/settings.router";
<<<<<<< HEAD
=======

>>>>>>> b2b5aa1c866c05890709d79383eed2522ae4003f
import branchRouter from "./super_admin/branch.route";
import placesRouter from "./super_admin/places.router";
import productRouter from "./super_admin/product.route";
import ordersRouter from "./super_admin/orders.route";
import users_subscriptionRouter from "./super_admin/users_subscription.route";
import reportsRouter from "./super_admin/reports.route";
<<<<<<< HEAD
=======

// import productRouter from "./super_admin/product.route";
// import placesRouter from "./super_admin/places.router";
>>>>>>> b2b5aa1c866c05890709d79383eed2522ae4003f
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
<<<<<<< HEAD
=======

>>>>>>> b2b5aa1c866c05890709d79383eed2522ae4003f
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
<<<<<<< HEAD
  
=======
  {
    path: "/product",
    route: productRouter,
  }
>>>>>>> b2b5aa1c866c05890709d79383eed2522ae4003f
];

defaultRoutes.forEach((route) => {
  mainRouter.use(route.path, route.route);
});

export default mainRouter;
