import express from "express";

import { newSubscription,getAllSubscription,singleSubscription,getSubcription_order } from "../../controllers/user/subscription.controller";

import {authenticateJWT} from  '../../middlewares/authToken.middleware'

const subscriptionRouter = express.Router({
  caseSensitive: true,
  strict: true,
});

subscriptionRouter.post("/new_subscription",authenticateJWT, newSubscription);
subscriptionRouter.post("/get_all_subscription", authenticateJWT,getAllSubscription);
subscriptionRouter.post("/single_subscription",authenticateJWT, singleSubscription);

subscriptionRouter.post("/subcription_order",authenticateJWT, getSubcription_order);


export default subscriptionRouter;
