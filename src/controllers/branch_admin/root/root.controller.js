import knex from "../../../services/db.service";
import { getPageNumber } from "../../../utils/helper.util";
import bcrypt from "bcrypt";

export const updateRoute = async (req, res) => {
  try {
    const { starting_point,ending_point } = req.body;

    if (!starting_point) {
      req.flash("error", "location is missing");
      return res.redirect("branch_admin/rider/get_rider");
    }
    if (!ending_point) {
      req.flash("error", "location is missing");
      return res.redirect("branch_admin/root/apporve_purchase_order"); 
    }

    let query = {};
   

    query.starting_point = starting_point;
    query.ending_point = ending_point;
    // query.address = address;

    await knex("route_details").update(query).where({ id: id });

    req.flash("success", "Updated SuccessFully");
    res.redirect("branch_admin/root/apporve_purchase_order");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updateRouteStatus = async (req, res) => {
  try {
    const { status, id } = req.body;

    if (status == "1") {
      await knex("route_details").update({ status: "0" }).where({ id: id });
    } else {
      await knex("route_details").update({ status: "1" }).where({ id: id });
    }

    req.flash("success", "Updated SuccessFully");
    res.redirect("branch_admin/root/apporve_purchase_order");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const createRoute = async (req, res) => {
  try {
    const { starting_point,ending_point,mobile_number } = req.body;
    if (!starting_point) {
      req.flash("error", "Name is missing");
      return res.redirect("branch_admin/root/apporve_purchase_order");
    }

    if (!ending_point) {
      req.flash("error", "password is missing");
      return res.redirect("branch_admin/root/apporve_purchase_order");
    }

    if (!mobile_number) {
      req.flash("error", "mobile number is missing");
      return res.redirect("branch_admin/root/apporve_purchase_order");
    }


    const user_length = await knex("route_details").select("id")

    await knex("route_details").insert({
      starting_point,
      ending_point,
      mobile_number,
      user_name : `rider${user_length.length + 1}`
    });

    req.flash("success", "Successfully Created");
    res.redirect("branch_admin/root/apporve_purchase_order");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getRoute = async (req, res) => {
  try {
    let loading = true;
    const { searchKeyword } = req.query;

    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT id FROM route_details WHERE route_name LIKE '%${searchKeyword}%'`
      );

      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No Route Found");
        return res.redirect("branch_admin/rider/get_rider");
      }
    } else {
      data_length = await knex("route_details").select("id");
    }

    // const cities = await knex("cities")
    //   .select("id", "name")
    //   .where({ status: "1" });

    if (data_length.length === 0) {
      loading = false;
      return res.render("branch_admin/root/apporve_purchase_order", {
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
    } = await getPageNumber(req, res, data_length, "branch_admin/root/apporve_purchase_order");

    let results;
    let is_search = false;
    if (searchKeyword) {
      results = await knex.raw(
        `SELECT id,route_name,starting_point,ending_point,mobile_number,status FROM route_details WHERE route_name LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
      );
      is_search = true;
    } else {
      results = await knex.raw(
        `SELECT route_name,starting_point,ending_point,mobile_number,status FROM route_details LIMIT ${startingLimit},${resultsPerPage}`
      );
    }

    const data = results[0];

    // for (let i = 0; i < data.length; i++) {
    //   data[i].password = process.env.BASE_URL + data[i].password;
    // }

    loading = false;
    res.render("branch_admin/root/apporve_purchase_order", {
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
    console.log(error);
    res.redirect("/home");
  }
};

// export const getRoot = async (req, res) => {
//   try {
//     res.render("branch_admin/root/apporve_purchase_order");
//   } catch (error) {
//     console.log(error);
//     res.redirect("/home");
//   }
// };

// export const getGeneratePurchaseList = async (req, res) => {
//   try {

//    res.render("branch_admin/root/generate_purchase_order");
//   } catch (error) {
//     console.log(error);
//     res.redirect("/home");
//   }
// };

// export const getCancelPurchaseList = async (req, res) => {
//   try {
    
//     res.render("branch_admin/root/cancelled_purchase_order");
//   } catch (error) {
//     console.log(error);
//     res.redirect("/home");
//   }
// };