import express  from 'express';
import { getUserList,getSubscriptionUserList,getCancelUserList } from "../../controllers/branch_admin/subscription/subscription_type.controller"


const subscriptionRouter = express.Router({
  caseSensitive: true,
  strict: true
})

subscriptionRouter.get('/get_user_list',getUserList)
subscriptionRouter.get('/get_subscription_user_list',getSubscriptionUserList)
subscriptionRouter.get('/get_cancel_user_list',getCancelUserList)


export default subscriptionRouter