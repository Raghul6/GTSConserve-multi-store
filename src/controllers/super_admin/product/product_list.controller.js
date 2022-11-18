import knex from "../../../services/db.service";
import { getPageNumber } from "../../../utils/helper.util";

export const getProductList = async (req, res) => {
  try {
    let loading = true;
    const { searchKeyword } = req.query;

    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT products.name FROM products WHERE products.name LIKE '%${searchKeyword}%'`
      );

      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No Category Found");
        return res.redirect("/super_admin/product/get_category");
      }
    } else {
      data_length = await knex("products").select("id");
    }

    let {
      startingLimit,
      page,
      resultsPerPage,
      numberOfPages,
      iterator,
      endingLink,
    } = await getPageNumber(req, data_length, "get_product_list");

    let results;
    let is_search = false;
    if (searchKeyword) {
      results = await knex.raw(
        `SELECT products.name,products.image,products.description,products.status,products.price,products.unit_value,
         product_type.name,categories.name,unit_types.value FROM products 
         JOIN product_type ON products.product_type_id = product_type.id
         JOIN categories ON products.category_id = categories.id 
         JOIN unit_types ON products.unit_type_id = unit_types.id
         WHERE products.name LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
      );
      is_search = true;
    } else {
      results = await knex.raw(
        `SELECT products.name,products.image,products.description,products.status,products.price,products.unit_value,
         product_type.name,categories.name, unit_types.value FROM products
         JOIN product_type ON products.product_type_id = product_type.id 
         JOIN categories ON products.category_id = categories.id 
         JOIN unit_types ON products.unit_type_id = unit_types.id 
         LIMIT ${startingLimit},${resultsPerPage}`
      );
    }

    const data = results[0];

    for (let i = 0; i < data.length; i++) {
      data[i].image = "http://" + req.headers.host + data[i].image;
    }

    const productType = await knex("product_type")
      .select("name", "id")
      .where({ status: "1" });
    const categories = await knex("categories")
      .select("name", "id")
      .where({ status: "1" });
    const unit_types = await knex("unit_types")
      .select("value", "id")
      .where({ status: "1" });

    loading = false;
    res.render("super_admin/product/product", {
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
};

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category_id,
      unit_value,
      unit_type_id,
      price,
      product_type_id,
    } = req.body;
    if (!name) {
      req.flash("error", "Name is missing");
      return res.redirect("/super_admin/product/get_product_list");
    }
    if (!product_type_id) {
      req.flash("error", "Please Choose a Product Type");
      return res.redirect("/super_admin/product/get_product_list");
    }
    if (!description) {
      req.flash("error", "Description is Missing");
      return res.redirect("/super_admin/product/get_product_list");
    }
    if (!category_id) {
      req.flash("error", "Please Choose a Category");
      return res.redirect("/super_admin/product/get_product_list");
    }
    if (!unit_value) {
      req.flash("error", "Please Give a Unit Value");
      return res.redirect("/super_admin/product/get_product_list");
    }
    if (!unit_type_id) {
      req.flash("error", "Please Choose a Unit");
      return res.redirect("/super_admin/product/get_product_list");
    }
    if (!price) {
      req.flash("error", "Please Give a Price");
      return res.redirect("/super_admin/product/get_product_list");
    }

    if (!req.file) {
      req.flash("error", "Please Choose a image");
      return res.redirect("/super_admin/product/get_product_list");
    }

    const image = req.file.destination.slice(1) + "/" + req.file.filename;

    await knex("products").insert({
      category_id,
      unit_type_id,
      product_type_id,
      name,
      unit_value,
      price,
      image,
      description,
    });

    req.flash("success", "Successfully Created");
    res.redirect("/super_admin/product/get_product_list");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};
