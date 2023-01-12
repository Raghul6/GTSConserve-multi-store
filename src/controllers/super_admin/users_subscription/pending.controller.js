import knex from "../../../services/db.service";
import { getPageNumber } from "../../../utils/helper.util";
import moment from "moment";

export const createUsers = async (req, res) => {
  try {
    const { data } = req.body;
    console.log(req.body);

    let user_query = {};
    user_query.mobile_number = data.mobile_number;
    user_query.name = data.user_name;

    let get_all_users = await knex.select("id").from("users");
    let users_length = get_all_users.length + 1;

    user_query.user_unique_id = "CUSTOMER" + users_length;

    if (data.email) {
      user_query.email = data.email;
    }

    const user = await knex("users").insert(user_query);

    const address = await knex("user_address").insert({
      user_id: user[0],
      branch_id: data.branch_id,
      title: data.address_title,
      address: data.address,
      landmark: data.address_landmark ? data.address_landmark : null,
      latitude: data.latitude,
      longitude: data.longitude,
      alternate_mobile: data.alternate_mobile_number
        ? data.alternate_mobile_number
        : null,
    });

    if (data.sub_product) {
      let sub_product_query = {
        start_date: data.sub_start_date,
        user_id: user[0],
        product_id: data.sub_product,
        user_address_id: address[0],
        quantity: data.sub_qty,
        subscribe_type_id: data.your_plan,
        branch_id: data.branch_id,
        date: data.sub_start_date,
        subscription_start_date: data.sub_start_date,
        subscription_status: "assigned",
      };

      if (data.your_plan == 3) {
        let weekdays = await knex("weekdays").select("id", "name");
        let store_weekdays = [];
        for (let i = 0; i < data.custom_days.length; i++) {
          for (let j = 0; j < weekdays.length; j++) {
            if (weekdays[j].id == data.custom_days[i]) {
              store_weekdays.push(weekdays[j].name);
            }
          }
        }
        sub_product_query.customized_days = JSON.stringify(store_weekdays);
      }

      await knex("subscribed_user_details").insert(sub_product_query);
    }

    if (data.add_on.length !== 0) {
      const order = await knex("add_on_orders").insert({
        user_id: user[0],
        delivery_date: data.delivery_date,
        address_id: address[0],
        branch_id: data.branch_id,
        status: "assigned",
      });

      let order_id = order[0];

      let sub_total = 0;

      for (let i = 0; i < data.add_on.length; i++) {
        const product_price = await knex("products")
          .select("price")
          .where({ id: data.add_on[i].product_id });

        await knex("add_on_order_items").insert({
          add_on_order_id: order_id,
          user_id: user[0],
          product_id: data.add_on[i].product_id,
          quantity: data.add_on[i].qty,
          price: product_price[0].price,
          total_price: product_price[0].price * data.add_on[i].qty,
        });

        sub_total = sub_total + product_price[0].price * data.add_on[i].qty;
      }

      await knex("add_on_orders").update({ sub_total }).where({ id: order_id });
    }

    req.flash("success", "Success Fully Added");
    res.redirect("/home?is_user_added=2");
    // return { status: true };
  } catch (error) {
    console.log(error);
    res.redirect("/home?is_user_added=1");
  }
};

export const getCreateUsers = async (req, res) => {
  try {
    const branch_admin = await knex("admin_users")
      .select("id", "first_name")
      .where({ status: "1", user_group_id: 2 });

    const get_subscription_products = await knex("products")
      .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
      .select(
        "products.id",
        "products.name",
        "products.unit_value",
        "unit_types.value as unit_type",
        "products.price"
      )
      .where({
        "products.product_type_id": 1,
        "products.status": "1",
      });
    const add_on_products = await knex("products")
      .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
      .select(
        "products.id",
        "products.name",
        "products.unit_value",
        "unit_types.value as unit_type",
        "products.price"
      )
      .where({
        "products.product_type_id": 2,
        "products.status": "1",
      });

    const get_plan = await knex("subscription_type")
      .select("name", "id")
      .where({ status: "1" });

    res.render("super_admin/users/add_user", {
      get_subscription_products,
      add_on_products,
      get_plan,
      branch_admin,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const cancelPendingList = async (req, res) => {
  try {
    const { id,add_on_id } = req.body;


    if(id){

      await knex("subscribed_user_details")
      .update({ subscription_status: "cancelled" })
      .where({ id });
      
      req.flash("success", "SuccessFully Cancelled the Subscription");
      return res.redirect("/super_admin/users_subscription/get_new_users");
    }

    if(add_on_id){
      await knex("add_on_orders")
      .update({ status: "cancelled" })
      .where({ id : add_on_id });
      
      req.flash("success", "SuccessFully Cancelled the Add On Order");
      return res.redirect("/super_admin/users_subscription/get_new_users");
    }

  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getNewUsers = async (req, res) => {
  try {
    let loading = true;
    const { searchKeyword } = req.query;

    let data_length = [];
    let data_length_2 = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT subscribed_user_details.id FROM subscribed_user_details JOIN users ON users.id = subscribed_user_details.user_id WHERE subscribed_user_details.subscription_status = "pending" AND users.user_unique_id LIKE '%${searchKeyword}%'`
      );

      const search_data_2_length = await knex.raw(
        `SELECT adds.id,adds.user_id ,adds.delivery_date,adds.sub_total,
        users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
          user_address.address,user_address.id as user_address_id ,user_address.landmark
          FROM add_on_orders as adds 
          JOIN users ON users.id = adds.user_id 
          JOIN user_address ON user_address.id = adds.address_id
          WHERE adds.branch_id IS NULL AND adds.status = "pending" AND  users.user_unique_id LIKE '%${searchKeyword}%'`
      );

      data_length = search_data_length[0];
      data_length_2 = search_data_2_length[0];
      if (data_length.length === 0 && data_length_2.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No User Found");
        return res.redirect("/super_admin/users_subscription/get_new_users");
      }
    } else {
      data_length = await knex("subscribed_user_details")
        .select("id")
        .where({ subscription_status: "pending" });

      data_length_2 = await knex("add_on_orders")
        .select("id")
        .whereNull("branch_id");
    }

    const branches = await knex("admin_users")
      .select("first_name", "id", "location")
      .where({ user_group_id: "2", status: "1" });

    if (data_length.length === 0 && data_length_2.length === 0) {
      loading = false;
      return res.render("super_admin/users_subscription/pending", {
        subscription_users: data_length,
        add_on_users: data_length_2,
        searchKeyword,
        branches,
      });
    }

    let both_data = [];
    if (data_length.length === 0 && data_length_2.length !== 0) {
      both_data = data_length_2;
    } else if (data_length.length !== 0 && data_length_2.length === 0) {
      both_data = data_length;
    } else {
      both_data = [...data_length, ...data_length_2];
    }

    let {
      startingLimit,
      page,
      resultsPerPage,
      numberOfPages,
      iterator,
      endingLink,
    } = await getPageNumber(
      req,
      res,
      both_data,
      "users_subscription/get_new_users"
    );

    let results;
    let is_search = false;
    let data = [];

    let subscription_users = [];
    let add_on_users = [];

    if (data_length !== 0) {
      if (searchKeyword) {
        results = await knex.raw(
          `SELECT sub.id , sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
        user_address.address,user_address.id as user_address_id ,user_address.landmark,products.name as product_name,products.price,products.unit_value,products.image,
        unit_types.value,categories.name as category_name
        FROM subscribed_user_details AS sub 
        JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id 
        JOIN users ON users.id = sub.user_id 
        JOIN user_address ON user_address.id = sub.user_address_id
        JOIN products ON products.id = sub.product_id
        JOIN unit_types ON unit_types.id = products.unit_type_id
        JOIN categories ON categories.id = products.category_id
        WHERE sub.subscription_status = "pending" 
        AND users.user_unique_id LIKE '%${searchKeyword}%'`
        );
        is_search = true;
      } else {
        results = await knex.raw(
          `SELECT sub.id ,sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
        user_address.address,user_address.id as user_address_id ,user_address.landmark,products.name as product_name,products.price,products.unit_value,products.image,
        unit_types.value,categories.name as category_name
        FROM subscribed_user_details AS sub 
        JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id 
        JOIN users ON users.id = sub.user_id 
        JOIN user_address ON user_address.id = sub.user_address_id
        JOIN products ON products.id = sub.product_id
        JOIN unit_types ON unit_types.id = products.unit_type_id
        JOIN categories ON categories.id = products.category_id
        WHERE sub.subscription_status = "pending" `
        );
      }
      subscription_users = results[0];
      for (let i = 0; i < subscription_users.length; i++) {
        subscription_users[i].start_date = moment(
          subscription_users[i].start_date
        ).format("DD-MM-YYYY");
        subscription_users[i].image =
          process.env.BASE_URL + subscription_users[i].image;
      }
    }
    let search_query;
    if (searchKeyword) {
      search_query = `AND  users.user_unique_id LIKE '%${searchKeyword}%'`;
    }

    const add_on_order_query =
      await knex.raw(`SELECT adds.id,adds.user_id ,adds.delivery_date,adds.sub_total,
    users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
      user_address.address,user_address.id as user_address_id ,user_address.landmark
      FROM add_on_orders as adds 
      JOIN users ON users.id = adds.user_id 
      JOIN user_address ON user_address.id = adds.address_id
      WHERE adds.branch_id IS NULL AND adds.status = "pending" ${
        searchKeyword ? search_query : ""
      }`);

    // console.log(add_on_order_query[0]);

    let get_user_products_query;
    if (add_on_order_query[0].length !== 0) {
      for (let i = 0; i < add_on_order_query[0].length; i++) {
        get_user_products_query = await knex("add_on_order_items as adds")
          .select(
            "adds.add_on_order_id",
            "adds.quantity",
            "adds.price",
            "adds.total_price",
            "products.name as product_name",
            "products.image",
            "products.unit_value",
            "unit_types.value"
          )
          .join("products", "products.id", "=", "adds.product_id")
          .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
          .where({ "adds.add_on_order_id": add_on_order_query[0][i].id });

        for (let j = 0; j < get_user_products_query.length; j++) {
          get_user_products_query[j].image =
            process.env.BASE_URL + get_user_products_query[j].image;
        }
        add_on_order_query[0][i].is_add_on = true;
        add_on_order_query[0][i].add_on_order_id = add_on_order_query[0][i].id;
        add_on_order_query[0][i].add_on_products = get_user_products_query;
        add_on_order_query[0][i].delivery_date = moment(
          add_on_order_query[0][i].delivery_date
        ).format("DD-MM-YYYY");

        add_on_users.push(add_on_order_query[0][i]);
      }
      // console.log(get_user_products_query)
    }

    // console.log(data);

    // check that new user did the sub and add on at same time (like if he did the add on while pending the subscription)
    let view_add_on_products = [];
    for (let i = 0; i < subscription_users.length; i++) {
      for (let j = 0; j < add_on_users.length; j++) {
        if (
          add_on_users[j].user_address_id ==
          subscription_users[i].user_address_id
        ) {
          add_on_users[j].is_subscription_pending = true;
          subscription_users[i].is_add_on_pending = true;
          view_add_on_products.push({
            add_on_order_id: add_on_users[j].add_on_order_id,
            delivery_date: add_on_users[j].delivery_date,
            sub_total: add_on_users[j].sub_total,
            add_on_products: add_on_users[j].add_on_products,
          });
        }
      }
      subscription_users[i].add_on_details = view_add_on_products;
      view_add_on_products = [];
    }
    // console.log(add_on_users, "some");
    //  console.log(subscription_users)
    //  console.log(subscription_users[0])

    // if new user did the two add on orders
 
    for (let i = 0; i < add_on_users.length; i++) {
      if (add_on_users[i].is_subscription_pending != true) {
        for (let j = 0; j < add_on_users.length; j++) {
          if (
            add_on_users[i].user_address_id ==
              add_on_users[j].user_address_id &&
            add_on_users[i].id != add_on_users[j].id
          ) {
            add_on_users[i].is_add_on_duplicate = true;
            add_on_users[j].is_add_on_duplicate = true;

            if (add_on_users[j].add_on_duplicate_details) {

              add_on_users[j].add_on_duplicate_details.push({
                add_on_order_id: add_on_users[i].add_on_order_id,
                delivery_date: add_on_users[i].delivery_date,
                sub_total: add_on_users[i].sub_total,
                add_on_products: add_on_users[i].add_on_products,
              });
            } else {
        
              add_on_users[j].add_on_duplicate_details = [
                {
                  add_on_order_id: add_on_users[j].add_on_order_id,
                  delivery_date: add_on_users[j].delivery_date,
                  sub_total: add_on_users[j].sub_total,
                  add_on_products: add_on_users[j].add_on_products,
                },
                {
                  add_on_order_id: add_on_users[i].add_on_order_id,
                  delivery_date: add_on_users[i].delivery_date,
                  sub_total: add_on_users[i].sub_total,
                  add_on_products: add_on_users[i].add_on_products,
                },
              ];
            }
          }
        }
      }
    }
    console.log(add_on_users);

    loading = false;
    res.render("super_admin/users_subscription/pending", {
      data: data,
      subscription_users,
      add_on_users,
      page,
      iterator,
      endingLink,
      numberOfPages: 1,
      is_search,
      searchKeyword,
      loading,
      branches,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { admin_id } = req.body;
    let loading = true;
    const { searchKeyword } = req.query;

    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT  users.name,users.user_unique_id  FROM  user_address
        JOIN users ON users.id = user_address.user_id
        JOIN admin_users ON admin_users.id = user_address.branch_id
        WHERE users.name LIKE '%${searchKeyword}%' 
        OR users.mobile_number LIKE '%${searchKeyword}%' 
        OR admin_users.first_name LIKE '%${searchKeyword}%'`
      );
      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No User Found");
        return res.redirect("/super_admin/users_subscription/get_all_users");
      }
    } else {
      data_length = await knex("user_address").select("id");
      // .where({ branch_id: admin_id });
    }
    const branch = await knex("admin_users")
      .select("first_name", "id")
      .where({ status: "1", user_group_id: "2" });

    const routes = await knex("users")
      .select("name", "id")
      .where({ status: "1" });

    if (data_length.length === 0) {
      loading = false;
      return res.render("super_admin/users/users", {
        data: data_length,
        searchKeyword,
        routes,
        branch,
      });
    }

    let {
      startingLimit,
      page,
      resultsPerPage,
      numberOfPages,
      iterator,
      endingLink,
    } = await getPageNumber(
      req,
      res,
      data_length,
      "users_subscription/get_all_users"
    );

    let results;

    console.log(data_length);

    let is_search = false;
    if (searchKeyword) {
      results =
        await knex.raw(`SELECT user_address.id as user_address_id ,user_address.address,user_address.user_id as user_id, 
      users.name as user_name,users.user_unique_id,users.mobile_number,
      admin_users.first_name as branch_name , admin_users.id as branch_id
      FROM user_address 
      JOIN users ON users.id = user_address.user_id 
      LEFT JOIN admin_users ON admin_users.id = user_address.branch_id
      WHERE users.name LIKE '%${searchKeyword}%' 
      OR users.mobile_number LIKE '%${searchKeyword}%' 
      OR admin_users.first_name LIKE '%${searchKeyword}%'
      LIMIT ${startingLimit},${resultsPerPage}`);
      is_search = true;
    } else {
      results =
        await knex.raw(`SELECT user_address.id as user_address_id ,user_address.address,user_address.user_id as user_id, 
      users.name as user_name,users.user_unique_id,users.mobile_number,
      admin_users.first_name as branch_name,admin_users.id as branch_id
      FROM user_address 
      JOIN users ON users.id = user_address.user_id 
      LEFT JOIN admin_users ON admin_users.id = user_address.branch_id
      LIMIT ${startingLimit},${resultsPerPage}`);
    }

    const data = results[0];
    loading = false;

    res.render("super_admin/users/users", {
      data,
      page,
      iterator,
      endingLink,
      numberOfPages,
      is_search,
      searchKeyword,
      loading,
      routes,
      branch,
    });

    // let loading = true;
    // const { searchKeyword } = req.query;

    // let data_length = [];

    // if (searchKeyword) {
    //   const search_data_length = await knex.raw(
    //     `SELECT admin_users.first_name FROM admin_users WHERE admin_users.first_name LIKE '%${searchKeyword}%'`
    //   );
    //   // `SELECT  .id,admin_users.first_name as admin_users.first_name,subscription_type.name,products.name,user_address.address,users.mobile_number,product_type.name
    //   //   FROM subscription_type
    //   //   JOIN product_type ON products.product_type_id = product_type.id
    //   //   JOIN admin_users ON admin_users.id = subscription_type.id
    //   //   JOIN user_address ON user_address.user_id = users.user_group_id
    //   //    WHERE admin_users.first_name LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`

    //   data_length = search_data_length[0];

    //   if (data_length.length === 0) {
    //     loading = false;
    //     req.query.searchKeyword = "";
    //     req.flash("error", "No Product Type Found");
    //     return res.redirect("/super_admin/users_subscription/get_all_users");
    //   }
    // } else {
    //   data_length = await knex("subscription_type").select("id");
    // }

    // // const branches = await knex("admin_users")
    // //   .select("first_name", "id", "location")
    // //   .where({ user_group_id: "2" });

    // if (data_length.length === 0) {
    //   loading = false;
    //   return res.render("super_admin/users_subscription/approve", {
    //     data: data_length,
    //     searchKeyword,
    //     // branches,
    //   });
    // }

    // let {
    //   startingLimit,
    //   page,
    //   resultsPerPage,
    //   numberOfPages,
    //   iterator,
    //   endingLink,
    // } = await getPageNumber(
    //   req,
    //   res,
    //   data_length,
    //   "users_subscription/get_all_users"
    // );

    // let results;
    // let is_search = false;
    // if (searchKeyword) {
    //   results = await knex.raw(
    //     `SELECT sub.id , sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
    //     user_address.address,user_address.landmark,products.name as product_name,products.price,products.unit_value,
    //     unit_types.value,categories.name as category_name,admin_users.first_name as first_name
    //     FROM subscribed_user_details AS sub
    //     JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id
    //     JOIN users ON users.id = sub.user_id
    //     JOIN user_address ON user_address.id = sub.user_address_id
    //     JOIN products ON products.id = sub.product_id
    //     JOIN unit_types ON unit_types.id = products.unit_type_id
    //     JOIN categories ON categories.id = products.category_id
    //     JOIN admin_users ON admin_users.user_group_id = subscription_type.id
    //     WHERE sub.subscription_status = "subscribed"
    //     AND admin_users.first_name LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
    //   );
    //   is_search = true;
    //   console.log(results);
    // } else if (!searchKeyword) {
    //   results = await knex.raw(
    //     `SELECT sub.id ,sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
    //     user_address.address,user_address.landmark,products.name as product_name,products.price,products.unit_value,
    //     unit_types.value,categories.name as category_name,admin_users.first_name as first_name,user_address_subscribe_branch.user_id,products.unit_value as product_unit,products.price as product_price
    //     FROM subscribed_user_details AS sub
    //     JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id
    //     JOIN users ON users.id = sub.user_id
    //     JOIN user_address ON user_address.id = sub.user_address_id
    //     JOIN products ON products.id = sub.product_id
    //     JOIN unit_types ON unit_types.id = products.unit_type_id
    //     JOIN categories ON categories.id = products.category_id
    //     JOIN admin_users ON admin_users.user_group_id = users.id
    //     JOIN user_address_subscribe_branch ON user_address_subscribe_branch.product_id = products.product_type_id
    //     WHERE sub.subscription_status = "subscribed" AND users.user_unique_id  LIMIT ${startingLimit},${resultsPerPage}`
    //   );
    // } else {
    //   data1 = await knex.raw(
    //     `SELECT sub.id ,sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
    //     user_address.address,user_address.landmark,products.name as product_name,products.price,products.unit_value,
    //     unit_types.value,categories.name as category_name,admin_users.first_name as first_name,user_address_subscribe_branch.user_id,products.unit_value as product_unit,products.price as product_price
    //     FROM subscribed_user_details AS sub
    //     JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id
    //     JOIN users ON users.id = sub.user_id
    //     JOIN user_address ON user_address.user_id = sub.user_address_id
    //     JOIN products ON products.product_type_id = sub.user_id
    //     JOIN unit_types ON unit_types.id = products.unit_type_id
    //     JOIN categories ON categories.id = products.product_type_id
    //     JOIN admin_users ON admin_users.user_group_id = users.id
    //     JOIN user_address_subscribe_branch ON user_address_subscribe_branch.product_id = products.product_type_id
    //     JOIN add_on_order_items ON add_on_order_items.add_on_order_id = products.product_type_id
    //     WHERE sub.subscription_status = "subscribed" AND users.user_unique_id  LIMIT ${startingLimit},${resultsPerPage}`
    //   );
    // }

    // console.log(data1);

    // const data = results[0];

    // for (let i = 0; i < data.length; i++) {
    //   data[i].start_date = data[i].start_date.toString().slice(4, 16);
    // }

    // const data1 = results[0];

    // for (let i = 0; i < data1.length; i++) {
    //   data1[i].start_date = data1[i].start_date.toString().slice(4, 16);
    // }

    // loading = false;
    // res.render("super_admin/users_subscription/approve", {
    //   data: data,
    //   data1: data1,
    //   page,
    //   iterator,
    //   endingLink,
    //   numberOfPages,
    //   is_search,
    //   searchKeyword,
    //   loading,
    //   // branches,
    // });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};



export const updatePendingList = async (req, res) => {
  try {
    const { sub_id, branch_id, address_id, add_on_id } = req.body;
    // console.log(address_id);
    // console.log(add_on_id);

    const { add_on_order_id } = req.body;

    console.log(add_on_order_id, "add", typeof add_on_order_id);
    console.log(sub_id, "sub");
    console.log(address_id, "address");

    if (add_on_order_id) {
      if (typeof add_on_order_id == "string") {
        await knex("add_on_orders")
          .update({ branch_id, status: "assigned" })
          .where({ id: add_on_order_id });
      } else {
        for (let i = 0; i < add_on_order_id.length; i++) {
          await knex("add_on_orders")
            .update({ branch_id, status: "assigned" })
            .where({ id: add_on_order_id[i] });
        }
      }
    }

    if (sub_id) {
      await knex("subscribed_user_details")
        .update({
          branch_id,
          subscription_status: "assigned",
          assigned_date: new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),
        })
        .where({ id: sub_id });
    }

    await knex("user_address").update({ branch_id }).where({ id: address_id });

    req.flash("success", "Subscription Moved To Branch");
    res.redirect("/super_admin/users_subscription/get_new_users");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updateAllUsersStatus = async (req, res) => {
  try {
    const { status, id } = req.body;

    if (status == "1") {
      await knex("admin_users").update({ status: "1" }).where({ id: id });
    } else {
      await knex("admin_users").update({ status: "0" }).where({ id: id });
    }
    console.log("hell");
    req.flash("success", "Updated SuccessFully");
    return res.redirect(
      "/super_admin/users_subscription/update_all_users_status"
    );
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};


export const getSingleUser = async (req, res) => {
  try {
    const { user_address_id } = req.query;
    const { admin_id } = req.body;

    const get_user_query =
      await knex.raw(`SELECT user_address.id as user_address_id,
      user_address.address,user_address.user_id as user_id, 
      users.name as user_name,users.user_unique_id,users.mobile_number,
      routes.name as route_name,admin_users.first_name as branch_name
      FROM user_address 
      JOIN users ON users.id = user_address.user_id 
      LEFT JOIN admin_users ON admin_users.id = user_address.branch_id
      LEFT JOIN routes ON routes.id = user_address.router_id
      WHERE user_address.id = ${user_address_id}`);

    if (get_user_query[0].length === 0) {
      req.flash("error", "User Not Found");
      return res.redirect("/home");
    }

    const user = get_user_query[0][0];

    const get_subscription_products = await knex(
      "subscribed_user_details as sub"
    )
      .select(
        "sub.id as sub_id",
        "sub.user_id",
        "sub.start_date",
        "sub.customized_days",
        "sub.quantity",
        "sub.subscription_status",
        "products.name as product_name",
        "products.unit_value",
        "products.id as product_id",
        "products.price",
        "unit_types.value",
        "subscription_type.name as sub_name"
      )
      .join("products", "products.id", "=", "sub.product_id")
      .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
      .join(
        "subscription_type",
        "subscription_type.id",
        "=",
        "sub.subscribe_type_id"
      )

      .where({
        "sub.user_id": user.user_id,
        "sub.user_address_id": user_address_id,
      });

    const current_month = moment().format("M");

    let get_additional_orders = [];

    let subscription_ids = [];

    let is_subscription_active = 0;
    if (get_subscription_products.length !== 0) {
      for (let i = 0; i < get_subscription_products.length; i++) {
        subscription_ids.push(get_subscription_products[i].sub_id);

        /////////////////////////////////////////////////////////////////////////////// pause

        let pause_dates = [];

        const pause_orders_query = await knex("pause_dates")
          .select("date", "id")
          .where({ subscription_id: get_subscription_products[i].sub_id });

        if (pause_orders_query.length !== 0) {
          for (let k = 0; k < pause_orders_query.length; k++) {
            pause_dates.push(
              moment(pause_orders_query[k].date).format("YYYY-MM-DD")
            );
          }
        }
        get_subscription_products[i].pause_dates = pause_dates;
        pause_dates = [];

        /////////////////////////////////////////////////////////////////////////////// additional
        const additional_orders_parent_id = await knex(
          "additional_orders_parent"
        )
          .select("id")
          .where({
            subscription_id: get_subscription_products[i].sub_id,
            // month: current_month,
          });

        // if (additional_orders_parent_id.length !== 0) {
        let additional_orders = {};
        const additional_orders_query = await knex("additional_orders")
          .select("date", "status", "quantity")
          .where({
            subscription_id: get_subscription_products[i].sub_id,
            is_cancelled: "0",
          });
        // .where({
        //   additional_orders_parent_id: additional_orders_parent_id[0].id,
        // });

        if (additional_orders_query.length !== 0) {
          // additional_orders.additional_orders_parent_id =
          //   additional_orders_parent_id[0].id;
          additional_orders.qty = additional_orders_query[0].quantity;
          let orders = [];
          let dates = [];
          let is_active = false;
          for (let i = 0; i < additional_orders_query.length; i++) {
            if (additional_orders_query[i].status == "pending") {
              is_active = true;
            }

            orders.push({
              date: moment(additional_orders_query[i].date).format(
                "DD-MM-YYYY"
              ),
              qty: additional_orders_query[i].quantity,
              status: additional_orders_query[i].status,
            });

            dates.push(
              moment(additional_orders_query[i].date).format("YYYY-MM-DD")
            );
          }
          additional_orders.dates = dates;
          additional_orders.order_details = orders;
          additional_orders.sub_id = get_subscription_products[i].sub_id;
          additional_orders.is_active = is_active;
          orders = [];

          // additional_orders

          get_subscription_products[i].additional_orders = additional_orders;
          get_additional_orders.push(additional_orders);
          // }
        }

        if (get_subscription_products[i].subscription_status == "subscribed") {
          is_subscription_active = 1;
        }

        get_subscription_products[i].start_date = moment(
          get_subscription_products[i].start_date
        ).format("DD-MM-YYYY");
      }
    }

    const add_on_order_query =
      await knex.raw(`SELECT adds.id,adds.user_id ,adds.delivery_date,adds.sub_total,adds.status
      FROM add_on_orders as adds 
      WHERE adds.user_id = ${user.user_id} AND adds.address_id = ${user_address_id}`);

    // console.log(add_on_order_query[0]);
    let add_on = add_on_order_query[0];

    let is_add_on_active = 0;
    let get_user_products_query;
    if (add_on.length !== 0) {
      for (let i = 0; i < add_on.length; i++) {
        if (
          add_on[i].status == "pending" ||
          add_on[i].status == "new_order" ||
          add_on[i].status == "order_placed"
        ) {
          is_add_on_active = 1;
        }

        get_user_products_query = await knex("add_on_order_items as adds")
          .select(
            "adds.add_on_order_id",
            "adds.quantity",
            "adds.price",
            "adds.total_price",
            "adds.status",
            "products.name as product_name",
            "products.image",
            "products.unit_value",
            "unit_types.value"
          )
          .join("products", "products.id", "=", "adds.product_id")
          .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
          .where({ "adds.add_on_order_id": add_on[i].id });

        for (let j = 0; j < get_user_products_query.length; j++) {
          get_user_products_query[j].image =
            process.env.BASE_URL + get_user_products_query[j].image;
        }
        add_on[i].add_on_products = get_user_products_query;
        add_on[i].delivery_date = moment(add_on[i].delivery_date).format(
          "DD-MM-YYYY"
        );
      }
    }

    // for new subscription and add on

    const get_plan = await knex("subscription_type")
      .select("name", "id")
      .where({ status: "1" });

    let sub_product_id = [];
    if (get_subscription_products.length !== 0) {
      for (let i = 0; i < get_subscription_products.length; i++) {
        sub_product_id.push(get_subscription_products[i].product_id);
      }
    }

    const add_subscription_products = await knex("products")
      .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
      .select(
        "products.id",
        "products.name",
        "products.unit_value",
        "unit_types.value as unit_type",
        "products.price"
      )
      .where({
        "products.product_type_id": 1,
        "products.status": "1",
      })
      .whereNotIn("products.id", sub_product_id);

    const add_on_products = await knex("products")
      .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
      .select(
        "products.id",
        "products.name",
        "products.unit_value",
        "unit_types.value as unit_type",
        "products.price"
      )
      .where({
        "products.product_type_id": 2,
        "products.status": "1",
      });

    // console.log(get_additional_orders , "check")
    // console.log(get_subscription_products[0]);
    // console.log(get_subscription_products[0].pause_dates);

    res.render("super_admin/users/user_detail", {
      user,
      sub_products: get_subscription_products,
      add_on,
      is_add_on_active,
      is_subscription_active,
      get_plan,
      get_subscription_products: add_subscription_products,
      add_on_products,
      get_additional_orders,
    });
  } catch (error) {
    console.log(error);
    return res.redirect("/home");
  }
};





// subscribe and unsubscrivbe
export const unsubscribeSubscription = async (req, res) => {
  try {
    const { sub_id, user_id, user_address_id } = req.body;

    await knex("subscribed_user_details")
      .update({ subscription_status: "unsubscribed" })
      .where({ id: sub_id, user_id });

    req.flash("success", "UnSubscribed SuccessFully");
    res.redirect(
      `/super_admin/users_subscription/single_user?user_address_id=${user_address_id}`
    );
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const subscribeSubscription = async (req, res) => {
  try {
    const { sub_id, user_id, user_address_id } = req.body;

    await knex("subscribed_user_details")
      .update({ subscription_status: "subscribed" })
      .where({ id: sub_id, user_id });

    req.flash("success", "Subscribed SuccessFully");
    res.redirect(
      `/super_admin/users_subscription/single_user?user_address_id=${user_address_id}`
    );
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};


export const updateUser = async (req,res) =>{
  try {
    const {user_name,mobile_number,address,address_id} = req.body

    const user_id = await knex("user_address").select("user_id").where({id : address_id})

    await knex("user_address").update({address}).where({id : address_id})

    await knex("users").update({name : user_name , mobile_number}).where({id : user_id[0].user_id})

    req.flash("success","User Detail Updated SuccessFully")
    res.redirect("/super_admin/users_subscription/get_all_users")


  } catch (error) {
    console.log(error)
    res.redirect("/home")
  }
}


export const getUserFeedback = async (req,res) => {
  try {
    const { admin_id } = req.body;
    let loading = true;
    const { searchKeyword } = req.query;

    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT feedbacks.id,users.mobile_number FROM  feedbacks
        JOIN users ON users.id = feedbacks.user_id
        WHERE users.mobile_number LIKE '%${searchKeyword}%'`
      );
      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No User Found");
        return res.redirect("/super_admin/users_subscription/get_user_feedback");
      }
    } else {
      data_length = await knex("feedbacks").select("id");
      // .where({ branch_id: admin_id });
    }


    if (data_length.length === 0) {
      loading = false;
      return res.render("super_admin/users/feedback", {
        data: data_length,
        searchKeyword,
      });
    }

    let {
      startingLimit,
      page,
      resultsPerPage,
      numberOfPages,
      iterator,
      endingLink,
    } = await getPageNumber(
      req,
      res,
      data_length,
      "users_subscription/get_user_feedback"
    );

    let results;

    let is_search = false;
    if (searchKeyword) {
      results =
        await knex.raw(`SELECT feedbacks.comments,feedbacks.id,feedback_message.message,users.name,users.mobile_number FROM feedbacks
      JOIN users ON users.id = feedbacks.user_id 
      JOIN feedback_message ON feedback_message.id = feedbacks.message_id 
      WHERE users.mobile_number LIKE '%${searchKeyword}%'
      ORDER BY feedbacks.id DESC
      LIMIT ${startingLimit},${resultsPerPage}`);
      is_search = true;
    } else {
      results =
        await knex.raw(`SELECT feedbacks.comments,feedbacks.id,feedback_message.message,users.name,users.mobile_number FROM feedbacks
        JOIN users ON users.id = feedbacks.user_id 
        JOIN feedback_message ON feedback_message.id = feedbacks.message_id
        ORDER BY feedbacks.id DESC
        LIMIT ${startingLimit},${resultsPerPage}`);
    }

    const data = results[0];
    loading = false;

    console.log(data)

    res.render("super_admin/users/feedback", {
      data,
      page,
      iterator,
      endingLink,
      numberOfPages,
      is_search,
      searchKeyword,
      loading,
    });


  } catch (error) {
    console.log(error)
    res.redirect("/home")
  }
}


// export const getSingleUser = async (req, res) => {
//   try {
//     const { user_address_id } = req.query;
//     const { admin_id } = req.body;

//     const get_user_query =
//       await knex.raw(`SELECT user_address.id as user_address_id,
//       user_address.address,user_address.user_id as user_id, 
//       users.name as user_name,users.user_unique_id,users.mobile_number,
//       routes.name as route_name,admin_users.first_name as branch_name
//       FROM user_address 
//       JOIN users ON users.id = user_address.user_id 
//       LEFT JOIN admin_users ON admin_users.id = user_address.branch_id
//       LEFT JOIN routes ON routes.id = user_address.router_id
//       WHERE user_address.id = ${user_address_id}`);

//     if (get_user_query[0].length === 0) {
//       req.flash("error", "User Not Found");
//       return res.redirect("/home");
//     }

//     const user = get_user_query[0][0];

//     // console.log(user);

//     const get_subscription_products = await knex(
//       "subscribed_user_details as sub"
//     )
//       .select(
//         "sub.id as sub_id",
//         "sub.user_id",
//         "sub.start_date",
//         "sub.customized_days",
//         "sub.quantity",
//         "sub.subscription_status",
//         "products.name as product_name",
//         "products.unit_value",
//         "products.price",
//         "unit_types.value",
//         "subscription_type.name as sub_name"
//       )
//       .join("products", "products.id", "=", "sub.product_id")
//       .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
//       .join(
//         "subscription_type",
//         "subscription_type.id",
//         "=",
//         "sub.subscribe_type_id"
//       )

//       .where({
//         "sub.user_id": user.user_id,
//         "sub.user_address_id": user_address_id,
//       });

//     // console.log(get_subscription_products);

//     let is_subscription_active = 0;
//     if (get_subscription_products.length !== 0) {
//       for (let i = 0; i < get_subscription_products.length; i++) {
//         if (get_subscription_products[i].subscription_status == "subscribed") {
//           is_subscription_active = 1;
//         }

//         get_subscription_products[i].start_date = moment(
//           get_subscription_products[i].start_date
//         ).format("DD-MM-YYYY");
//       }
//     }

//     const add_on_order_query =
//       await knex.raw(`SELECT adds.id,adds.user_id ,adds.delivery_date,adds.sub_total,adds.status
//       FROM add_on_orders as adds 
//       WHERE adds.user_id = ${user.user_id} AND adds.address_id = ${user_address_id}`);

//     // console.log(add_on_order_query[0]);
//     let add_on = add_on_order_query[0];
//     console.log(add_on)

//     let is_add_on_active = 0;
//     let get_user_products_query;
//     if (add_on.length !== 0) {
//       for (let i = 0; i < add_on.length; i++) {
//         if (add_on[i].status == "pending") {
//           is_add_on_active = 1;
//         }

//         get_user_products_query = await knex("add_on_order_items as adds")
//           .select(
//             "adds.add_on_order_id",
//             "adds.quantity",
//             "adds.price",
//             "adds.total_price",
//             "adds.status",
//             "products.name as product_name",
//             "products.image",
//             "products.unit_value",
//             "unit_types.value"
//           )
//           .join("products", "products.id", "=", "adds.product_id")
//           .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
//           .where({ "adds.add_on_order_id": add_on[i].id });

//         for (let j = 0; j < get_user_products_query.length; j++) {
//           get_user_products_query[j].image =
//             process.env.BASE_URL + get_user_products_query[j].image;
//         }
//         add_on[i].add_on_products = get_user_products_query;
//         add_on[i].delivery_date = moment(add_on[i].delivery_date).format(
//           "DD-MM-YYYY"
//         );
//       }
//     }

//     res.render("super_admin/users/user_detail", {
//       user,
//       sub_products: get_subscription_products,
//       add_on,
//       is_add_on_active,
//       is_subscription_active,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.redirect("/home");
//   }
// };


