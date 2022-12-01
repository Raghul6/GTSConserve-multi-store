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

export const additional_product = async (user_id,subscribe_type_id,product_id,name,quantity,price,total_days) => { 
  if(subscribe_type_id==1){
  const added = await knex('orders').insert({user_id:user_id,subscribe_type_id:subscribe_type_id,product_id:product_id,name:name,quantity:quantity,total_days:1})}
  else{
    const added = await knex('orders').insert({user_id:user_id,subscribe_type_id:subscribe_type_id,product_id:product_id,name:name,quantity:quantity,total_days:15})
  }

   // .raw('sum(quantity * total_days) as price')
  // .where({})
try{

 return { status: true, body: added };
  } catch (error) {
    
    return { status: false, error };
  }
}


// export const get_bill = async (product_id) => {
//   const bill_details = await knex.('bill_history').
// }

// export const addon_order = async (user_id,subscribe_type_id,category_id,product_id) =>{
//   const add_on = await knex('add_on_orders').join('add_on_order_items').insert({user_id:user_id,subscribe_type_id:subscribe_type_id,product_id:product_id,category_id:category_id})
//   try{

//     return { status: true, body:add_on };
//      } catch (error) {
       
//        return { status: false, error };
//      }
// }






