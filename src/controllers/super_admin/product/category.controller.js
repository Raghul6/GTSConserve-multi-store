import knex from "../../../services/db.service";

export const updateCategory = async (req, res) => {
  try {
    const { name, id , product_type_id } = req.body;
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

    if(product_type_id){
        query.product_type_id = product_type_id
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
    const categories = await knex("categories")
      .select(
        "categories.id",
        "categories.name",
        "categories.image",
        "categories.status",
        "product_type.name as product_type",
        "product_type.id as product_type_id"
      )
      .join(
        "product_type",
        "categories.product_type_id",
        "=",
        "product_type.id"
      );

    for (let i = 0; i < categories.length; i++) {
      categories[i].image = "http://" + req.headers.host + categories[i].image;
    }

    const productType = await knex("product_type")
      .select("name", "id")
      .where({ status: "1" });

    res.render("super_admin/product/category", { data: categories, productType });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};
