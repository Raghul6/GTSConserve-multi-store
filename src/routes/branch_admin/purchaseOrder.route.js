import express  from 'express';
import { getApprovePurchaseList,getGeneratePurchaseList,getCancelPurchaseList } from "../../controllers/branch_admin/purchaseOrder/purchase_orders.controller"


const purchaseOrderRouter = express.Router({
  caseSensitive: true,
  strict: true
})

purchaseOrderRouter.get('/get_approve_purchase_list',getApprovePurchaseList)
purchaseOrderRouter.get('/get_generate_purchase_list',getGeneratePurchaseList)
purchaseOrderRouter.get('/get_cancel_purchase_list',getCancelPurchaseList)


export default purchaseOrderRouter