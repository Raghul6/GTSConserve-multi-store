import express  from 'express';

import { getAssigned,updateSubscribed,updateCancel } from '../../controllers/branch_admin/subscription/pending.controller';

import { getSubscription } from '../../controllers/branch_admin/subscription/subscribed.controller';
import { getCancelled } from '../../controllers/branch_admin/subscription/cancelled.controller';

const subscriptionRouter = express.Router({
  caseSensitive: true,
  strict: true
})


subscriptionRouter.get('/assigned',getAssigned)
subscriptionRouter.post('/subscribed',updateSubscribed)
subscriptionRouter.post('/cancel',updateCancel)



subscriptionRouter.get('/subscribed',getSubscription)


subscriptionRouter.get('/cancelled',getCancelled)


export default subscriptionRouter