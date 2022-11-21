import express from "express";

import { newSubscription } from "../../controllers/user/subscription.controller";

const subscriptionRouter = express.Router({
  caseSensitive: true,
  strict: true,
});

subscriptionRouter.post("/new_subscription", newSubscription);


export default subscriptionRouter;
