import responseCode from "../../constants/responseCode";

import knex from "../../services/db.service";

// export const get_cities = async (req, res) => {
//   const getcities = await knex
//     .select("id", "name", "code", "zone_id", "country_id", "status")
//     .from("cities");
//   console.log(getcities);

//   try {
//     return { status: responseCode.SUCCESS, body: getcities };
//   } catch {
//     return {
//       status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
//       message: error,
//     };
//   }
// };

// export const get_countries = async (req, res) => {
//   const getcountries = await knex
//     .select("id", "code", "name", "phone_code", "status")
//     .from("countries");
//   try {
//     return { status: responseCode.SUCCESS, body: getcountries };
//   } catch {
//     return {
//       status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
//       message: error,
//     };
//   }
// };

// export const get_zones = async (req, res) => {
//   const getzones = await knex
//     .select("id", "name", "code", "country_id", "status")
//     .from("zones");
//   try {
//     return { status: responseCode.SUCCESS, body: getzones };
//   } catch {
//     return {
//       status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
//       message: error,
//     };
//   }
// };

// export const get_postcodes = async (req, res) => {
//   const getpostcodes = await knex
//     .select("id", "city_id", "country_id", "zone_id", "code", "status")
//     .from("postcodes");
//   try {
//     return { status: responseCode.SUCCESS, body: getpostcodes };
//   } catch {
//     return {
//       status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
//       message: error,
//     };
//   }
// };

export const get_products = async (id) => {
  const product = await knex("products")
    .join("categories", "products.category_id", "=", "categories.id")
    // .join("product_variations")
    .join("subscription_type")
    .select(
      "products.id",
      "products.name",
      "products.image",
      "category_id",
      "categories.name",
      "subscription_type.status",
      "subscription_type.name",
      "products.id",
      "products.unit_value",
      "products.price",
      "products.thumbnail_image",
      "products.status"
    )
    .whereRaw("products.product_type_id= ?", [1]);
  try {
    return { status: responseCode.SUCCESS, body: product };
  } catch {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR };
  }
};

export const get_categories = async (req, res) => {
  const getcategories = await knex.select("name").from("categories");
  try {
    return { status: responseCode.SUCCESS, body: getcategories };
  } catch {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR };
  }
};

export const get_product_type = async (req,res) => {
  const getproducttype = await knex.select('id','name','image').from('product_type');
  try{
    return {status:responseCode.SUCCESS,body:getproducttype};
  }
  catch{
    return { status:responseCode.FAILURE.INTERNAL_SERVER_ERROR};
  }
};

// export const get_all_products = async (req, res) => {
//   const getproducts = await knex("products")
//     .join("product_variations")
//     .select(
//       "products.name",
//       "product_variations.value",
//       "product_variations.price"
//     );
//   try {
//     return { status: responseCode.SUCCESS, body: getproducts };
//   } catch {
//     return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR };
//   }
// };
