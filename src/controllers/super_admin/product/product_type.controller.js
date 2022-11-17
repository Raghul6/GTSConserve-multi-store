import knex from "../../../services/db.service";

export const updateProductType = async (req, res) => {
  try {
    const { name, id } = req.body;
    const file = req.file;

    if (!name) {
      req.flash("error", "Name is missing");
      return res.redirect("/super_admin/product/get_all_product_type");
    }

    let query = {};

    query.name = name;
    if (file) {
      const image = req.file.destination.slice(1) + "/" + req.file.filename;
      query.image = image;
    }

    await knex("product_type").update(query).where({ id: id });

    req.flash("success", "Updated SuccessFully");
    res.redirect("/super_admin/product/get_all_product_type");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updateProductTypeStatus = async (req, res) => {
  try {
    const { status, id } = req.body;

    if (status == "1") {
      await knex("product_type").update({ status: "0" }).where({ id: id });
    } else {
      await knex("product_type").update({ status: "1" }).where({ id: id });
    }

    req.flash("success", "Updated SuccessFully");
    res.redirect("/super_admin/product/get_all_product_type");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getAllProductType = async (req, res) => {
  try {
     let loading = true;
    const { searchKeyword } = req.query;

    let product_types = [];

    if (searchKeyword) {
      const data = await knex.raw(
        `SELECT id,name,image,status FROM product_type WHERE name LIKE '%${searchKeyword}%'`
      );

      product_types = data[0];
    
      if (product_types.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No Product Type Found");
        return res.redirect("/super_admin/product/get_all_product_type");
      }
    } else {
      product_types = await knex("product_type").select(
        "id",
        "name",
        "image",
        "status"
      );
    }

    const resultsPerPage = 2;
    const numOfResults = product_types.length;
    const numberOfPages = Math.ceil(numOfResults / resultsPerPage);

    let page = req.query.page ? Number(req.query.page) : 1;
    if (page > numberOfPages) {
      return res.redirect(
        "/super_admin/product/get_all_product_type?page=" +
          encodeURIComponent(numberOfPages)
      );
    } else if (page < 1) {
      return res.redirect(
        "/super_admin/product/get_all_product_type?page=" +
          encodeURIComponent("1")
      );
    }
    //Determine the SQL LIMIT starting number
    const startingLimit = (page - 1) * resultsPerPage;
    //Get the relevant number of POSTS for this starting page
    let results 
    let is_search = false
    if(searchKeyword){
      results = await knex.raw(
        `SELECT id,name,image,status FROM product_type  WHERE name LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
      );
      is_search = true
    }else{

      results = await knex.raw(
       `SELECT id,name,image,status FROM product_type LIMIT ${startingLimit},${resultsPerPage}`
     );
    }

    const result = results[0];

    let iterator = page - 5 < 1 ? 1 : page - 5;
    let endingLink =
    iterator + 4 <= numberOfPages
    ? iterator + 4
    : page + (numberOfPages - page);
    if (endingLink < page + 1) {
      iterator -= page + 1 - numberOfPages;
    }
    
    
    for (let i = 0; i < result.length; i++) {
      result[i].image = "http://" + req.headers.host + result[i].image;
    }

    loading = false;
    res.render("super_admin/product/product_type", {
      data: result,
      page,
      iterator,
      endingLink,
      numberOfPages,
      is_search,
      searchKeyword,
      loading

    });

  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const createProductType = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      req.flash("error", "Name is missing");
      return res.redirect("/super_admin/product/get_all_product_type");
    }

    if (!req.file) {
      req.flash("error", "Please Choose a image");
      return res.redirect("/super_admin/product/get_all_product_type");
    }

    const image = req.file.destination.slice(1) + "/" + req.file.filename;

    await knex("product_type").insert({ name, image });
    req.flash("success", "Product Type Created SuccessFully");
    res.redirect("/super_admin/product/get_all_product_type");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};
