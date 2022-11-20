import knex from "../../../services/db.service";
import { getPageNumber } from "../../../utils/helper.util";
import bcrypt from "bcrypt";

export const updateBranch = async (req, res) => {
  try {
    const { location, id, mobile_number } = req.body;

    if (!location) {
      req.flash("error", "location is missing");
      return res.redirect("/super_admin/branch/get_branch_admin");
    }
    if (!mobile_number) {
      req.flash("error", "mobile number is missing");
      return res.redirect("/super_admin/branch/get_branch_admin");
    }

    let query = {};

    query.location = location;
    query.mobile_number = mobile_number;

    await knex("admin_users").update(query).where({ id: id });

    req.flash("success", "Updated SuccessFully");
    res.redirect("/super_admin/branch/get_branch_admin");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updateBranchStatus = async (req, res) => {
  try {
    const { status, id } = req.body;
console.log(status,id)
    if (status == "1") {
      await knex("admin_users").update({ status: "0" }).where({ id: id });
    } else {
      await knex("admin_users").update({ status: "1" }).where({ id: id });
    }

    req.flash("success", "Updated SuccessFully");
    res.redirect("/super_admin/branch/get_branch_admin");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const createBranchAdmin = async (req, res) => {
  try {
    const { name, email, password, location, mobile_number } = req.body;
    if (!name) {
      req.flash("error", "Name is missing");
      return res.redirect("/super_admin/branch/get_branch_admin");
    }
    if (!email) {
      req.flash("error", "email is missing");
      return res.redirect("/super_admin/branch/get_branch_admin");
    }
    if (!password) {
      req.flash("error", "password is missing");
      return res.redirect("/super_admin/branch/get_branch_admin");
    }
    if (!location) {
      req.flash("error", "location is missing");
      return res.redirect("/super_admin/branch/get_branch_admin");
    }
    if (!mobile_number) {
      req.flash("error", "mobile number is missing");
      return res.redirect("/super_admin/branch/get_branch_admin");
    }

    if (password.length < 8) {
      req.flash("error", "password Should be atleast 8 characters");
      return res.redirect("/super_admin/branch/get_branch_admin");
    }

    let hash_password = await bcrypt.hash(password, 10);

    await knex("admin_users").insert({
      user_group_id: "2",
      first_name: name,
      password: hash_password,
      location,
      mobile_number,
      email,
    });

    req.flash("success", "Successfully Created");
    res.redirect("/super_admin/branch/get_branch_admin");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getBranchAdmin = async (req, res) => {
  try {
    let loading = true;
    const { searchKeyword } = req.query;

    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT id FROM admin_users WHERE user_group_id = "2" AND  first_name LIKE '%${searchKeyword}%'`
      );

      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No User Found");
        return res.redirect("/super_admin/branch/get_branch_admin");
      }
    } else {
      data_length = await knex("admin_users")
        .select("id")
        .where({ user_group_id: "2" });
    }

    if (data_length.length === 0) {
      loading = false;
      return res.render("super_admin/branch/branch", {
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
    } = await getPageNumber(req, res, data_length, "branch/branch");

    let results;
    let is_search = false;
    if (searchKeyword) {
      results = await knex.raw(
        `SELECT id,first_name,location,mobile_number,email,status,password,is_password_change FROM admin_users WHERE user_group_id = "2" AND first_name LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
      );
      is_search = true;
    } else {
      results = await knex.raw(
        `SELECT id,first_name,location,mobile_number,email,status,password,is_password_change FROM admin_users WHERE user_group_id = "2" LIMIT ${startingLimit},${resultsPerPage}`
      );
    }

    const data = results[0];

    // for (let i = 0; i < data.length; i++) {
    //   data[i].password = process.env.BASE_URL + data[i].password;
    // }

    loading = false;
    res.render("super_admin/branch/branch", {
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
