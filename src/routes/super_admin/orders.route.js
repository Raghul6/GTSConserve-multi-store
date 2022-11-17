import express from "express";

import { getApproveList } from "../../controllers/super_admin/orders/approve.controller";
import { getPendingList } from "../../controllers/super_admin/orders/pending.controller";
import { getCancelList } from "../../controllers/super_admin/orders/cancel.controller";

const ordersRouter = express.Router({
  caseSensitive: true,
  strict: true,
});

ordersRouter.get("/get_approve_list", getApproveList);
ordersRouter.get("/get_pending_list", getPendingList);
ordersRouter.get("/get_cancel_list", getCancelList);

export default ordersRouter;
