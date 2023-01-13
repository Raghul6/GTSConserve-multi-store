import express from "express";
import { authenticateJWT, nonMandatoryToken } from "../../middlewares/authToken.middleware";
import {
  getProducts,
  getCategories,
  getSubscriptionProducts,
  getAddOnProducts,
  searchProducts,
  addon_Order,
  getSingleProduct,
  removeAddOnOrder,
  nextDayProduct
} from "../../controllers/user/product.controller";

const productRouter = express.Router({
  caseSensitive: true,
  strict: true,
});


productRouter.post("/get_categories",nonMandatoryToken,getCategories);
productRouter.post("/get_products", nonMandatoryToken,getProducts);
productRouter.post("/search_products",nonMandatoryToken,searchProducts);

productRouter.get("/get_subscription_product",nonMandatoryToken,getSubscriptionProducts);
productRouter.get("/get_add_on_product", nonMandatoryToken,authenticateJWT,getAddOnProducts);

productRouter.post("/get_single_product",nonMandatoryToken,authenticateJWT,getSingleProduct);


productRouter.post("/create_add_on_products", authenticateJWT,nonMandatoryToken,addon_Order);
productRouter.post("/remove_add_on_products",nonMandatoryToken,authenticateJWT,nonMandatoryToken,removeAddOnOrder);


// next day delivery product api

productRouter.post("/next_day_product",nonMandatoryToken,nextDayProduct);


export default productRouter;
