import express from "express";
import { multerStorage } from "../../utils/helper.util";
import multer from "multer";
// import { getApproveList } from "../../controllers/super_admin/orders/active_orders.controller";
// import { getPendingList } from "../../controllers/super_admin/orders/all_orders.controller";
// import { getCancelList } from "../../controllers/super_admin/orders/delivered_orders.controller";
// import { getCancelList1 } from "../../controllers/super_admin/orders/cancelled_orders.controller";
import {
  getCategory,
  createCategory,
  updateCategoryStatus,
  updateCategory,
} from "../../controllers/super_admin/orders/active_orders.controller";

const ordersRouter = express.Router({
  caseSensitive: true,
  strict: true,
});

const path = "./uploads/products";

const storage = multerStorage(path);

const uploadImg = multer({ storage: storage }).single("image");

const menuRouter = express.Router({
  caseSensitive: true,
  strict: true,
});

ordersRouter.get("/active_orders", getCategory);
ordersRouter.post("/create_category", uploadImg, createCategory);
ordersRouter.post("/update_category_status", updateCategoryStatus);
ordersRouter.post("/update_category", uploadImg, updateCategory);

// ordersRouter.get("/get_approve_list",  getCategory);
// ordersRouter.get("/get_pending_list",  getCategory);
// ordersRouter.get("/get_cancel_list",  getCategory);
// ordersRouter.get("/get_cancel_list1",  getCategory);
export default ordersRouter;
