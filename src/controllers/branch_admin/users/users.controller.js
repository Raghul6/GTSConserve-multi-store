import knex from "../../../services/db.service";
import { getPageNumber } from "../../../utils/helper.util";

export const getusers = async (req, res) => {
  try {
    const { admin_id } = req.body;
    let loading = true;
    const { searchKeyword } = req.query;

 


    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT users.name FROM users
        JOIN subscribed_user_details ON subscribed_user_details.user_id = users.id
        JOIN add_on_orders ON add_on_orders.user_id = users.id
        JOIN routes ON routes.id = subscribed_user_details.router_id
        WHERE subscribed_user_details.user_id = ${admin_id}   subscribed_user_details.subscription_status = "subscribed" AND users.name LIKE '%${searchKeyword}%'`
      );   
      // JOIN add_on_orders ON add_on_orders.branch_id = subscribed_user_details.branch_id 
      data_length = search_data_length[0];
     
      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No User  Found");
        return res.redirect("/branch_admin/users/users");
      }
    } else {
      data_length = await knex("subscribed_user_details")
        .select("id")
        .where({ subscription_status: "subscribed", branch_id: admin_id });
    }
    const routes = await knex("routes")
      .select("name", "id")
      .where({ status: "1" });

    if (data_length.length === 0) {
      loading = false;
      return res.render("branch_admin/users/users", {
        data: data_length,
        searchKeyword,
        routes,
      });
    }

    let {
      startingLimit,
      page,
      resultsPerPage,
      numberOfPages,
      iterator,
      endingLink,
    } = await getPageNumber(req, res, data_length, "users/users");

    let results;
    let is_search = false;
    if (searchKeyword) {
      results = await knex.raw(
        `SELECT sub.id , sub.start_date,sub.subscription_start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
            user_address.address,user_address.landmark,products.name as product_name,products.price,products.unit_value,
            unit_types.value,categories.name as category_name
            FROM subscribed_user_details AS sub 
            JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id 
            JOIN users ON users.id = sub.user_id
             JOIN add_on_orders ON add_on_orders.user_id  = sub.user_id 
            JOIN user_address ON user_address.id = sub.user_address_id
            JOIN products ON products.id = sub.product_id
            JOIN unit_types ON unit_types.id = products.unit_type_id
            JOIN categories ON categories.id = products.category_id
            WHERE sub.subscription_status = "subscribed" AND sub.branch_id = ${admin_id}
            AND users.name LIKE '%${searchKeyword}%' `
      );
      // JOIN add_on_orders ON add_on_orders.user_id  = sub.user_id 

      is_search = true;
    } else {
      results = await knex.raw(
        `SELECT sub.id ,sub.start_date,sub.subscription_start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
            user_address.address,user_address.landmark,products.name as product_name,
           
            products.price,products.unit_value,
            unit_types.value,categories.name as category_name,
            routes.name as route_name
            FROM subscribed_user_details AS sub 
            JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id 
            JOIN users ON users.id = sub.user_id 
            JOIN user_address ON user_address.id = sub.user_address_id
            JOIN products ON products.id = sub.product_id
            JOIN routes ON routes.id = sub.router_id
            JOIN unit_types ON unit_types.id = products.unit_type_id
            JOIN categories ON categories.id = products.category_id
            WHERE sub.subscription_status = "subscribed" AND sub.branch_id = ${admin_id} LIMIT ${startingLimit},${resultsPerPage}`
      );
    }

    console.log(admin_id)
    console.log(startingLimit)
    console.log(resultsPerPage)

    // routes.name as route_name
    // JOIN add_on_orders ON add_on_orders.user_id  = sub.user_id 

    // add_on_orders.route_id,sub.route_id
    // JOIN add_on_orders ON add_on_orders.user_id  = sub.user_id 

    // sub.id ,sub.start_date,sub.subscription_start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
    // user_address.address,user_address.landmark,products.name as product_name,products.price,products.unit_value,
    // unit_types.value,categories.name as category_name
    // FROM subscribed_user_details AS sub 
    // JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id 
    // JOIN users ON users.id = sub.user_id 
    // JOIN user_address ON user_address.id = sub.user_address_id
    // JOIN products ON products.id = sub.product_id
    
    // JOIN unit_types ON unit_types.id = products.unit_type_id
    // JOIN categories ON categories.id = products.category_id
    // WHERE sub.subscription_status = "subscribed" AND sub.branch_id = ${admin_id} LIMIT ${startingLimit},${resultsPerPage}`





    const data = results[0];

    for (let i = 0; i < data.length; i++) {
      data[i].start_date = data[i].start_date.toString().slice(4, 16);
      if (data[i].subscription_start_date) {
        data[i].subscription_start_date = data[i].subscription_start_date
          .toString()
          .slice(4, 16);
      }
    }

    loading = false;
    res.render("branch_admin/users/users", {
      data: data,
      page,
      iterator,
      endingLink,
      numberOfPages,
      is_search,
      searchKeyword,
      loading,
      routes,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};
