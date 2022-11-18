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

export const getCategory = async (req, res) => {
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
        req.flash("error", "No Category Found");
        return res.redirect("/super_admin/product/get_category");
      }
    } else {
      data_length = await knex("categories").select("id");
    }

    let {
      startingLimit,
      page,
      resultsPerPage,
      numberOfPages,
      iterator,
      endingLink,
    } = await getPageNumber(req, data_length, "get_category");

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
      data[i].image = "http://" + req.headers.host + data[i].image;
    }

    const productType = await knex("product_type")
    .select("name", "id")
    .where({ status: "1" });



    loading = false;
    res.render("super_admin/product/category", {
      data,
      page,
      iterator,
      endingLink,
      numberOfPages,
      is_search,
      searchKeyword,
      loading,
      productType
    });
    // `SELECT categories.id,categories.name,categories.image,categories.status,product_type.name as product_type,product_type.id as product_type_id FROM categories JOIN product_type WHERE categories.product_type_id=product_type.id  name LIKE '%${searchKeyword}%'`

    // const categories = await knex("categories")
    //   .select(
    //     "categories.id",
    //     "categories.name",
    //     "categories.image",
    //     "categories.status",
    //     "product_type.name as product_type",
    //     "product_type.id as product_type_id"
    //   )
    //   .join(
    //     "product_type",
    //     "categories.product_type_id",
    //     "=",
    //     "product_type.id"
    //   );

    // for (let i = 0; i < categories.length; i++) {
    //   categories[i].image = "http://" + req.headers.host + categories[i].image;
    // }

  
    // res.render("super_admin/product/category", {
    //   data: categories,
    //   productType,
    // });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};
