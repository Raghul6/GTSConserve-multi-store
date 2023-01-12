import express  from 'express';
import { getTopBanner, getBottomBanner, getIntroBanners, getHomeService, getCategories, getCartRecommendedList, getTimeSlot, getPaymentMethod } from "../../controllers/home/home.controller"
import { nonMandatoryToken, authenticateJWT } from '../../middlewares/authToken.middleware'; 

const homeRouter = express.Router({
  caseSensitive: true,
  strict: true
})

homeRouter.get('/get_top_banner', getTopBanner)
homeRouter.get('/get_bottom_banner', getBottomBanner)
homeRouter.get('/service', getHomeService)
homeRouter.get('/get_intro_banner', getIntroBanners)
homeRouter.get('/get_home_service', getHomeService)
homeRouter.get('/get_categories', getCategories)
homeRouter.get('/get_cart_recommended_list', getCartRecommendedList)
homeRouter.get('/get_time_slot', getTimeSlot)
homeRouter.get('/get_payment_method', nonMandatoryToken,authenticateJWT, getPaymentMethod)

export default homeRouter