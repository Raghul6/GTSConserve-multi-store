import express from "express";
import subscriptionRouter from "./branch_admin/subscription.route";
import routeRouter from "./branch_admin/route.route";
import riderRouter from "./branch_admin/rider.router";
import purchaseOrderRouter from "./branch_admin/purchaseOrder.route";

const mainRouter = express.Router({
  caseSensitive: true,
  strict: true,
});

const defaultRoutes = [
  {
    path: "/subscription",
    route: subscriptionRouter,
  },
  {
    path: "/route",
    route: routeRouter,
  },
  {
    path: "/rider",
    route: riderRouter,
  },
  {
    path: "/purchaseOrder",
    route: purchaseOrderRouter,
  },
];

defaultRoutes.forEach((route) => {
  mainRouter.use(route.path, route.route);
});

export default mainRouter;
