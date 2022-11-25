import express from "express";
import subscriptionRouter from "./branch_admin/subscription.route";
import rootRouter from "./branch_admin/root.route";
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
    path: "/root",
    route: rootRouter,
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
