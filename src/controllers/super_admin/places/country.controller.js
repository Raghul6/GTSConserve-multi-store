import knex from "../../../services/db.service";
import { getPageNumber } from "../../../utils/helper.util";

export const getAllCountry = async (req, res) => {
  try {
    let loading = true;
    const { searchKeyword } = req.query;

    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT id,name FROM countries WHERE name LIKE '%${searchKeyword}%'`
      );

      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No Country Found");
        return res.redirect("/super_admin/places/country");
      }
    } else {
      data_length = await knex("countries").select("id");
    }

    if (data_length.length === 0) {
      loading = false;
      return res.render("super_admin/places/country", {
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
    } = await getPageNumber(req, res, data_length, "places/country");

    let results;
    let is_search = false;
    if (searchKeyword) {
      results = await knex.raw(
        `SELECT id,name,code,status,phone_code FROM countries  WHERE name LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
      );
      is_search = true;
    } else {
      results = await knex.raw(
        `SELECT id,name,code,status,phone_code FROM countries LIMIT ${startingLimit},${resultsPerPage}`
      );
    }

    const data = results[0];

    loading = false;
    res.render("super_admin/places/country", {
      data: data,
      page,
      iterator,
      endingLink,
      numberOfPages,
      is_search,
      searchKeyword,
      loading,
    });

    // res.render("super_admin/places/country");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const createCountry = async (req, res) => {
  try {
    const { name, code, phone_code } = req.body;

    if (!name) {
      req.flash("error", "Name is missing");
      return res.redirect("/super_admin/places/country");
    }

    if (!code) {
      req.flash("error", "code is missing");
      return res.redirect("/super_admin/places/country");
    }
    if (!phone_code) {
      req.flash("error", "Phone code is missing");
      return res.redirect("/super_admin/places/country");
    }

    await knex("countries").insert({ name, code, phone_code });
    req.flash("success", "Country Created SuccessFully");
    res.redirect("/super_admin/places/country");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updateCountry = async (req, res) => {
  try {
    const { name, id, code, phone_code } = req.body;

    if (!name) {
      req.flash("error", "Name is missing");
      return res.redirect("/super_admin/places/country");
    }

    let query = {};

    query.name = name;
    query.code = code;
    query.phone_code = phone_code;

    await knex("countries").update(query).where({ id: id });

    req.flash("success", "Updated SuccessFully");
    res.redirect("/super_admin/places/country");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updateCountryStatus = async (req, res) => {
  try {
    const { status, id } = req.body;

    if (status == "1") {
      await knex("countries").update({ status: "0" }).where({ id: id });
    } else {
      await knex("countries").update({ status: "1" }).where({ id: id });
    }

     req.flash("success", "Updated SuccessFully");
    return res.redirect("/super_admin/places/country");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};
