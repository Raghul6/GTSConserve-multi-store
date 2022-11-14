import express  from 'express';
import { getApproveList,getPendingList,getCancelList } from "../../controllers/super_admin/users_subscription/user_subscription.controller"


const users_subscriptionRouter = express.Router({
  caseSensitive: true,
  strict: true
})

users_subscriptionRouter.get('/get_approve_list',getApproveList)
users_subscriptionRouter.get('/get_pending_list',getPendingList)
users_subscriptionRouter.get('/get_cancel_list',getCancelList)


export default users_subscriptionRouter