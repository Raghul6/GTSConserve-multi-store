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
productRouter.post("/get_products", authenticateJWT,nonMandatoryToken,getProducts);
productRouter.post("/search_products",authenticateJWT,nonMandatoryToken,searchProducts);

productRouter.get("/get_subscription_product",nonMandatoryToken,getSubscriptionProducts);
productRouter.get("/get_add_on_product", nonMandatoryToken,getAddOnProducts);

productRouter.post("/get_single_product",authenticateJWT,nonMandatoryToken,getSingleProduct);

<<<<<<< HEAD

productRouter.post("/create_add_on_products", authenticateJWT,nonMandatoryToken,addon_Order);
productRouter.post("/remove_add_on_products",authenticateJWT,nonMandatoryToken,removeAddOnOrder);
=======
productRouter.post("/create_add_on_products", authenticateJWT,nonMandatoryToken,addon_Order);
productRouter.post("/remove_add_on_products",authenticateJWT,nonMandatoryToken,removeAddOnOrder);

>>>>>>> dbf07976ab45eef4f8345c422d3f4292a20ba8d0

// next day delivery product api for static

productRouter.post("/next_day_product", authenticateJWT,nonMandatoryToken,nextDayProduct);


export default productRouter;
