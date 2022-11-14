import express  from 'express';
import { getApproveList,getPendingList,getCancelList } from "../../controllers/super_admin/orders/orders.controller"


const ordersRouter = express.Router({
  caseSensitive: true,
  strict: true
})

ordersRouter.get('/get_approve_list',getApproveList)
ordersRouter.get('/get_pending_list',getPendingList)
ordersRouter.get('/get_cancel_list',getCancelList)


export default ordersRouter