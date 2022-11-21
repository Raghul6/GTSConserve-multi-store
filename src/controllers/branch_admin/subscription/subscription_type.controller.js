import knex from "../../../services/db.service";
import { getPageNumber } from "../../../utils/helper.util";

export const getUserList = async (req, res) => {
  try {
    let loading = true;
    const { searchKeyword } = req.query;

    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT subscription_type.name FROM products WHERE subscription_type.name LIKE '%${searchKeyword}%'`
      );

      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No User Found");
        return res.redirect("branch_admin/subscription/user");
      }
    } else {
      data_length = await knex("subscription_type").select("id");
    }

    let {
      startingLimit,
      page,
      resultsPerPage,
      numberOfPages,
      iterator,
      endingLink,
    } = await getPageNumber(req, data_length, "subscribed_user_details");

    let results;
    let is_search = false;
    if (searchKeyword) {
      results = await knex.raw(
        `SELECT subscription_type.name,subscription_type.status FROM subscription_type 
         JOIN subscribed_user_details ON subscription_type.id = subscribed_user_details.id
         WHERE subscription_type.name LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
      );
      // JOIN categories ON products.category_id = categories.id 
      //    JOIN unit_types ON products.unit_type_id = unit_types.id
      is_search = true;
    } else {
      results = await knex.raw(
        `SELECT subscription_type.name,subscription_type.status subscription_type
         JOIN subscribed_user_details ON subscription_type.id = subscribed_user_details.id 
         LIMIT ${startingLimit},${resultsPerPage}`
      );
    }

    const data = results[0];

    for (let i = 0; i < data.length; i++) {
      data[i].image = "http://" + req.headers.host + data[i].image;
    }

    const productType = await knex("subscription_type")
      .select("name", "id")
      .where({ status: "1" });
    const categories = await knex("subscribed_user_details")
      .select("name", "id")
      .where({ status: "1" });
    const unit_types = await knex("unit_types")
      .select("value", "id")
      .where({ status: "1" });

    loading = false;
    res.render("branch_admin/subscription/user", {
      data,
      page,
      iterator,
      endingLink,
      numberOfPages,
      is_search,
      searchKeyword,
      loading,
      productType,
      categories,
      unit_types
    });

  } catch (error) {
    console.log(error)
    res.redirect('/home')
  }
  // try {
  //   res.render("branch_admin/subscription/user");
  // } catch (error) {
  //   console.log(error); 
  //   res.redirect("/home");
  // } 
};

export const getSubscriptionUserList = async (req, res) => {
  try {
    let loading = true;
    const { searchKeyword } = req.query;

    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        // `SELECT subscription_type.name FROM products WHERE subscription_type.name LIKE '%${searchKeyword}%'`
      );

      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No User Found");
        return res.redirect("branch_admin/subscription/subscription_user");
      }
    } else {
      data_length = await knex("subscription_type").select("id");
    }

    let {
      startingLimit,
      page,
      resultsPerPage,
      numberOfPages,
      iterator,
      endingLink,
    } = await getPageNumber(req, data_length, "subscribed_user_details");

    let results;
    let is_search = false;
    if (searchKeyword) {
      results = await knex.raw(
        `SELECT subscription_type.name,subscription_type.status FROM subscription_type 
         JOIN subscribed_user_details ON subscription_type.id = subscribed_user_details.id
         WHERE subscription_type.name LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
      );
      // JOIN categories ON products.category_id = categories.id 
      //    JOIN unit_types ON products.unit_type_id = unit_types.id
      is_search = true;
    } else {
      results = await knex.raw(
        // `SELECT products.name,products.image,products.description,products.status,products.price,products.unit_value,
        //  product_type.name,categories.name, unit_types.value FROM products
        //  JOIN product_type ON products.product_type_id = product_type.id 
        //  JOIN categories ON products.category_id = categories.id 
        //  JOIN unit_types ON products.unit_type_id = unit_types.id 
        //  LIMIT ${startingLimit},${resultsPerPage}`
      );
    }

    const data = results[0];

    for (let i = 0; i < data.length; i++) {
      data[i].image = "http://" + req.headers.host + data[i].image;
    }

    const productType = await knex("subscription_type")
      .select("name", "id")
      .where({ status: "1" });
    const categories = await knex("subscribed_user_details")
      .select("name", "id")
      .where({ status: "1" });
    const unit_types = await knex("unit_types")
      .select("value", "id")
      .where({ status: "1" });

    loading = false;
    res.render("branch_admin/subscription/user", {
      data,
      page,
      iterator,
      endingLink,
      numberOfPages,
      is_search,
      searchKeyword,
      loading,
      productType,
      categories,
      unit_types
    });

  } catch (error) {
    console.log(error)
    res.redirect('/home')
  }
  // try {

  //  res.render("branch_admin/subscription/subscription_user");
  // } catch (error) {
  //   console.log(error);
  //   res.redirect("/home");
  // }
};

export const getCancelUserList = async (req, res) => {
  try {
    let loading = true;
    const { searchKeyword } = req.query;

    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        // `SELECT subscription_type.name FROM products WHERE subscription_type.name LIKE '%${searchKeyword}%'`
      );

      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No User Found");
        return res.redirect("branch_admin/subscription/cancelled_user");
      }
    } else {
      data_length = await knex("subscription_type").select("id");
    }

    let {
      startingLimit,
      page,
      resultsPerPage,
      numberOfPages,
      iterator,
      endingLink,
    } = await getPageNumber(req, data_length, "subscribed_user_details");

    let results;
    let is_search = false;
    if (searchKeyword) {
      results = await knex.raw(
        // `SELECT subscription_type.name,subscription_type.status FROM subscription_type 
        //  JOIN subscribed_user_details ON subscription_type.id = subscribed_user_details.id
        //  WHERE subscription_type.name LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
      );
      // JOIN categories ON products.category_id = categories.id 
      //    JOIN unit_types ON products.unit_type_id = unit_types.id
      is_search = true;
    } else {
      results = await knex.raw(
        // `SELECT products.name,products.image,products.description,products.status,products.price,products.unit_value,
        //  product_type.name,categories.name, unit_types.value FROM products
        //  JOIN product_type ON products.product_type_id = product_type.id 
        //  JOIN categories ON products.category_id = categories.id 
        //  JOIN unit_types ON products.unit_type_id = unit_types.id 
        //  LIMIT ${startingLimit},${resultsPerPage}`
      );
    }

    const data = results[0];

    for (let i = 0; i < data.length; i++) {
      data[i].image = "http://" + req.headers.host + data[i].image;
    }

    const productType = await knex("subscription_type")
      .select("name", "id")
      .where({ status: "1" });
    const categories = await knex("subscribed_user_details")
      .select("name", "id")
      .where({ status: "1" });
    const unit_types = await knex("unit_types")
      .select("value", "id")
      .where({ status: "1" });

    loading = false;
    res.render("branch_admin/subscription/user", {
      data,
      page,
      iterator,
      endingLink,
      numberOfPages,
      is_search,
      searchKeyword,
      loading,
      productType,
      categories,
      unit_types
    });

  } catch (error) {
    console.log(error)
    res.redirect('/home')
  }
  // try {
    
  //   res.render("branch_admin/subscription/cancelled_user");
  // } catch (error) {
  //   console.log(error);
  //   res.redirect("/home");
  // }
};