import knex from "../../services/db.service";
import { GetProduct } from "../../utils/helper.util";

export const get_subscription_or_add_on_products = async (id, userId) => {
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
    console.log(error);
    return { status: false, error };
  }
};

export const get_products = async (category_id,product_type_id, userId) => {
  try {
    const product = await knex("products")
      .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
      .select(
        "products.id as product_id",
        "products.name",
        "products.image",
        "products.unit_value",
        "unit_types.value as unit_type",
        "products.price"
      )
      .where({ category_id,product_type_id });

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
      .select(
        "categories.id as category_id",
        "categories.name",
        "categories.image"
      )
      .from("categories_product_type as cat")
      .join("categories", "categories.id", "=", "cat.category_id")
      .where({ "cat.product_type_id": product_type_id });

    console.log(getcategories);
    return { status: true, body: getcategories };
  } catch (error) {
    return { status: false, error };
  }
};

export const search_products = async (
  product_type_id,
  search_keyword,
  userId
) => {
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

export const additional_product = async (
  user_id,
  subscribe_type_id,
  product_id,
  name,
  quantity,
  price,
  total_days
) => {
  if (subscribe_type_id == 1) {
    const added = await knex("orders").insert({
      user_id: user_id,
      subscribe_type_id: subscribe_type_id,
      product_id: product_id,
      name: name,
      quantity: quantity,
      total_days: 1,
    });
  } else {
    const added = await knex("orders").insert({
      user_id: user_id,
      subscribe_type_id: subscribe_type_id,
      product_id: product_id,
      name: name,
      quantity: quantity,
      total_days: 15,
    });
  }

  try {
    return { status: true, body: added };
  } catch (error) {
    return { status: false, error };
  }
};

export const addon_order = async (
  user_id,
  delivery_date,
  products,
  address_id
) => {
  try {
    let query = {
      user_id: user_id,
      delivery_date: delivery_date,
      address_id: address_id,
    };
    console.log(query);

    const order = await knex("add_on_orders").insert(query);

    const product1 = await knex
      .select("id", "user_id")
      .from("add_on_orders")
      .where({ user_id: user_id });

    const product = [];

    for (let i = 0; i < products.length; i++) {
      product.push({
        product_id: products[i].product_id,
        quantity: products[i].quantity,
        add_on_order_id: product1[i].id,
        user_id: product1[i].user_id,
      });

      const sum_values = await knex("add_on_order_items").select(
        knex.raw("sum(quantity * price) as total_price")
      );
      console.log(sum_values);

      const order_list = await knex("add_on_order_items").insert({
        product_id: products[i].product_id,
        quantity: products[i].quantity,
        add_on_order_id: product1[i].id,
        user_id: product1[i].user_id,
        price: product1[0].price,
        total_price: sum_values[0].total_price,
      });

      const sub_value = await knex("add_on_orders")
        .insert({ sub_total: order_list.total_price })
        .where({ user_id: user_id });
      console.log(sub_value);
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: "Something Went Wrong", error };
  }
};
