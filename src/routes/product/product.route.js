import express from "express"
import { addFavourite,getAllProducts,getSingleProduct,getOfferProduct,getFavourite,getCategoryProduct ,createProductRating, getWalletHistory, getMembership, getBestSelingProduct, getRecommendedProduct} from "../../controllers/product/product.controller"
import { nonMandatoryToken, authenticateJWT } from "../../middlewares/authToken.middleware"

const productRouter = express.Router({
    caseSensitive: true,
    strict: true
})

productRouter.get('/get_offer_product', getOfferProduct)
productRouter.post('/add_favourite',  addFavourite)
productRouter.get('/get_favourite',  getFavourite)
productRouter.get('/get_all_products', getAllProducts)
productRouter.get('/get_single_product', getSingleProduct)
productRouter.get('/get_category_products', getCategoryProduct)
productRouter.post('/product_rating', createProductRating)
productRouter.post('/product_rating', createProductRating)
productRouter.get('/get_wallet_history', getWalletHistory)
productRouter.get('/get_membership', getMembership)
productRouter.get('/get_best_selling_product', getBestSelingProduct)
// productRouter.get('/get_offer_product', getOfferProduct)
// productRouter.get('/get_recommended_product', getRecommendedProduct)


export default productRouter