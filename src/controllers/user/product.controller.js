import responseCode from "../../constants/responseCode";
import messages from "../../constants/messages";
import {
  get_products,
  get_categories,
  get_subscription_or_add_on_products,
  search_products,
} from "../../models/user/product.model";

export const getProducts = async (req, res) => {
  try {
    const { category_id, userId } = req.body;

    if (!category_id) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "Category Id Is Missing" });
    }

    const product = await get_products(category_id, userId);

    if (!product.status) {
      return res
        .status(responseCode.FAILURE.DATA_NOT_FOUND)
        .json({ status: false, message: product.message });
    }

    return res.status(responseCode.SUCCESS).json({
      status: true,
      total_items: product.data.length,
      data: product.data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
};

export const getCategories = async (req, res) => {
  try {
    const { product_type_id } = req.body;

    if (!product_type_id) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "Product Type Id Is Missing" });
    }

    const category = await get_categories(product_type_id);

    if (!category.status) {
      return res
        .status(responseCode.FAILURE.DATA_NOT_FOUND)
        .json({ status: false, error: product.error });
    }

    if (category.body.length === 0) {
      return res
        .status(responseCode.FAILURE.DATA_NOT_FOUND)
        .json({ status: false, message: "No Category Found" });
    }

    for (let i = 0; i < category.body.length; i++) {
      category.body[i].image = process.env.BASE_URL + category.body[i].image;
    }

    return res
      .status(responseCode.SUCCESS)
      .json({ status: true, data: category.body });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
};

export const getSubscriptionProducts = async (req, res) => {
  try {
    const { userId } = req.body;

    const products = await get_subscription_or_add_on_products("1", userId);
    if (!products.status) {
      return res
        .status(responseCode.FAILURE.DATA_NOT_FOUND)
        .json({ status: false, message: products.message });
    }

    return res.status(responseCode.SUCCESS).json({
      status: true,
      data: products.data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
};

export const getAddOnProducts = async (req, res) => {
  try {
    const { userId } = req.body;
    const product = await get_subscription_or_add_on_products("2", userId);
    if (!product.status) {
      return res
        .status(responseCode.FAILURE.DATA_NOT_FOUND)
        .json({ status: false, message: product.message });
    }

    return res.status(responseCode.SUCCESS).json({
      status: true,
      data: product.data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { search_keyword, product_type_id, userId } = req.body;

    if (!product_type_id || !search_keyword) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: messages.MANDATORY_ERROR });
    }

    const product = await search_products(
      product_type_id,
      search_keyword,
      userId
    );
    if (!product.status) {
      return res
        .status(responseCode.FAILURE.DATA_NOT_FOUND)
        .json({ status: false, message: product.message });
    }

    return res.status(responseCode.SUCCESS).json({
      status: true,
      data: product.data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
};


// export const getBill = async (req,res) => {
//   try{
//     const{product_id} = req.body;

//   }
// }