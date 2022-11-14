import express from "express";

// Inner routes
import loginRouter from "./super_admin/login.route";
import settingsRouter from "./super_admin/settings.router";
// import placesRouter from "./super_admin/places.router";
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
  // {
  //   path: "/place",
  //   route: placesRouter,
  // },
];

defaultRoutes.forEach((route) => {
  mainRouter.use(route.path, route.route);
});

export default mainRouter;
