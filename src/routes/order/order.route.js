import express from "express"
import { getAllOrders, getSingleOrder, orderRating ,trackOrder} from "../../controllers/order/order.controller"
import { nonMandatoryToken, authenticateJWT } from "../../middlewares/authToken.middleware"

const orderRouter = express.Router({
    caseSensitive: true,
    strict: true
})

// orderRouter.get('/all_orders', authenticateJWT, getAllOrders)
// orderRouter.get('/single_order', authenticateJWT, getSingleOrder)
// orderRouter.post('/order_rating', authenticateJWT, orderRating)
orderRouter.get('/track_order', trackOrder)

export default orderRouter