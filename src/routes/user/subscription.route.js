import express from "express";

import { newSubscription,getAllSubscription,singleSubscription,productEdit } from "../../controllers/user/subscription.controller";

const subscriptionRouter = express.Router({
  caseSensitive: true,
  strict: true,
});

subscriptionRouter.post("/new_subscription", newSubscription);
subscriptionRouter.post("/get_all_subscription", getAllSubscription);
subscriptionRouter.post("/single_subscription", singleSubscription);
// subscriptionRouter.post("/product_edit", productEdit);


export default subscriptionRouter;
