import knex from "../../services/db.service";
import { GetProduct } from "../../utils/helper.util";

export const get_subscription_or_add_on_products = async (id,userId) => {
  try {
    const product = await knex("products")
      .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
      .select(
        "products.id",
        "products.name",
        "products.image",
        "products.unit_value",
        "unit_types.value as unit_type",
        "products.price"
      )
      .where({ product_type_id: id });

    const response = await GetProduct(product, userId);

    if (response.status) {
      return { status: true, data: response.data };
    } else {
      return { status: false, message: response.message };
    }

    // return { status: true, body: product };
  } catch (error) {
    console.log(error)
    return { status: false, error };
  }
};

export const get_products = async (category_id, userId) => {
  try {
    const product = await knex("products")
      .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
      .select(
        "products.id",
        "products.name",
        "products.image",
        "products.unit_value",
        "unit_types.value as unit_type",
        "products.price"
      )
      .where({ category_id });

    const response = await GetProduct(product, userId);

    if (response.status) {
      return { status: true, data: response.data };
    } else {
      return { status: false, message: response.message };
    }
  } catch (error) {
    console.log(error);
    return { status: false, error };
  }
};

export const get_categories = async (product_type_id) => {
  try {
    const getcategories = await knex
      .select("id as category_id", "name", "image", "product_type_id")
      .from("categories")
      .where({ product_type_id });
    return { status: true, body: getcategories };
  } catch (error) {
    return { status: false, error };
  }
};

export const search_products = async (product_type_id, search_keyword,userId) => {
  try {
    const product = await knex.raw(`
                      SELECT products.id,products.name,products.image,products.unit_value,
                      unit_types.value as unit_type,products.price FROM products
                      JOIN unit_types ON unit_types.id = products.unit_type_id
                      WHERE products.product_type_id = ${product_type_id} 
                      AND  products.name  LIKE '%${search_keyword}%'`);

    const response = await GetProduct(product[0], userId);

    if (response.status) {
      return { status: true, data: response.data };
    } else {
      return { status: false, message: response.message };
    }

    // return { status: true, body: product[0] };
  } catch (error) {
    console.log(error);
    return { status: false, error };
  }
};
