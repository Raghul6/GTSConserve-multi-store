export const getProductList = async (req,res) => {
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
    res.render("super_admin/product/product", {
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




        // res.render("super_admin/product/product")
    } catch (error) {
        
    }
}


export const createProduct = async (req, res) => {
    try {
      const { name,description , category_id , unit_value , unit_id ,price , product_type_id } = req.body;
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
      if (!unit_id) {
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




  
      await knex("categories").insert({ name, product_type_id, image });
  
      req.flash("success", "Successfully Created");
      res.redirect("/super_admin/product/get_product_list");
    } catch (error) {
      console.log(error);
      res.redirect("/home");
    }
  };