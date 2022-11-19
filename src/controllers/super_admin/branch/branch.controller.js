



import knex from "../../../services/db.service";
import { getPageNumber } from "../../../utils/helper.util";

export const updateCategory = async (req, res) => {
  try {
    const { name, id, product_type_id } = req.body;
    const file = req.file;

    if (!name) {
      req.flash("error", "Name is missing");
      return res.redirect("/super_admin/product/get_category");
    }

    let query = {};

    query.name = name;
    if (file) {
      const image = req.file.destination.slice(1) + "/" + req.file.filename;

      query.image = image;
    }

    if (product_type_id) {
      query.product_type_id = product_type_id;
    }

    await knex("categories").update(query).where({ id: id });

    req.flash("success", "Updated SuccessFully");
    res.redirect("/super_admin/product/get_category");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updateCategoryStatus = async (req, res) => {
  try {
    const { status, id } = req.body;

    if (status == "1") {
      await knex("categories").update({ status: "0" }).where({ id: id });
    } else {
      await knex("categories").update({ status: "1" }).where({ id: id });
    }

    req.flash("success", "Updated SuccessFully");
    res.redirect("/super_admin/product/get_category");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, product_type_id } = req.body;
    if (!name) {
      req.flash("error", "Name is missing");
      return res.redirect("/super_admin/product/get_category");
    }
    if (!product_type_id) {
      req.flash("error", "Please Choose a Product Type");
      return res.redirect("/super_admin/product/get_category");
    }

    if (!req.file) {
      req.flash("error", "Please Choose a image");
      return res.redirect("/super_admin/product/get_category");
    }

    const image = req.file.destination.slice(1) + "/" + req.file.filename;

    await knex("categories").insert({ name, product_type_id, image });

    req.flash("success", "Successfully Created");
    res.redirect("/super_admin/product/get_category");
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
        `SELECT categories.id,categories.name FROM categories JOIN product_type ON categories.product_type_id = product_type.id WHERE categories.name LIKE '%${searchKeyword}%'`
      );

      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No User Found");
        return res.redirect("/super_admin/branch/get_branch_admin");
      }
    } else {
      data_length = await knex("categories").select("id");
    }


    const productType = await knex("product_type")
      .select("name", "id")
      .where({ status: "1" });

    if (data_length.length === 0) {
      return res.render("super_admin/branch/branch", {
        data: data_length,
        searchKeyword,
        productType,
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
        `SELECT categories.id,categories.name,categories.image,categories.status,product_type.name as product_type,product_type.id as product_type_id FROM categories JOIN product_type ON categories.product_type_id=product_type.id WHERE categories.name LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
      );
      is_search = true;
    } else {
      results = await knex.raw(
        `SELECT categories.id,categories.name,categories.image,categories.status,product_type.name as product_type,product_type.id as product_type_id FROM categories JOIN product_type ON categories.product_type_id=product_type.id LIMIT ${startingLimit},${resultsPerPage}`
      );
    }

    const data = results[0];

    for (let i = 0; i < data.length; i++) {
      data[i].image = process.env.BASE_URL + data[i].image;
    }
   
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
      productType,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};
