import express  from 'express';
import { getApproveList } from '../../controllers/super_admin/users_subscription/approve.controller';
import { getPendingList } from '../../controllers/super_admin/users_subscription/pending.controller';
import { getCancelList } from '../../controllers/super_admin/users_subscription/cancel.controller';

const users_subscriptionRouter = express.Router({
  caseSensitive: true,
  strict: true
})

// pending
users_subscriptionRouter.get('/get_pending_list',getPendingList)
users_subscriptionRouter.post('/accept_or_reject',getPendingList)




users_subscriptionRouter.get('/get_approve_list',getApproveList)




users_subscriptionRouter.get('/get_cancel_list',getCancelList)


export default users_subscriptionRouter