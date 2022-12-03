import express  from 'express';

import { getDailyOrders } from '../../controllers/branch_admin/orders/order.controller';


const orderRouter = express.Router({
  caseSensitive: true,
  strict: true
})

orderRouter.get('/daily_orders',getDailyOrders)






export default orderRouter