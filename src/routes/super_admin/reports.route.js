import express  from 'express';

import { getAddOnProduct } from '../../controllers/super_admin/reports/add_on_products.controller';
import { getSubscriptionProduct } from '../../controllers/super_admin/reports/subscription.controller';


const reportsRouter = express.Router({
  caseSensitive: true,
  strict: true
})

reportsRouter.get('/get_add_on_product',getAddOnProduct)
reportsRouter.get('/get_subscription_product',getSubscriptionProduct)


export default reportsRouter