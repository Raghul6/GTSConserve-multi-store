import knex from "../../../services/db.service";
// import { cities } from "../../models/super_admin/login.module"
// import responseCode from "../../constants/responseCode"
// import messageCode from "../../constants/messages"

export const searchProductType = async (req, res) => {
  try {
 
     const { searchKeyword } = req.body;

    const search_product_type = await knex.raw(
      `SELECT id,name,image,status FROM product_type WHERE name LIKE '%${searchKeyword}%'`
    );


    if (search_product_type[0].length === 0) {
      req.flash("error", "No Product Type Found");
      return res.redirect("/super_admin/settings/get_all_product_type");
    }
   

    for (let i = 0; i < search_product_type[0].length; i++) {
      search_product_type[0][i].image =
        "http://" + req.headers.host + search_product_type[0][i].image;
    }
   // console.log('l')
  return res.json({data:search_product_type[0]})
  // return res.json
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updateProductType = async (req, res) => {
  try {
    const { name, id } = req.body;
    const file = req.file;

    if (!name) {
      req.flash("error", "Name is missing");
      return res.redirect("/super_admin/settings/get_all_product_type");
    }

    let query = {};

    query.name = name;
    if (file) {
      const image = req.file.destination.slice(1) + "/" + req.file.filename;
      query.image = image;
    }

    await knex("product_type").update(query).where({ id: id });

    req.flash("success", "Updated SuccessFully");
    res.redirect("/super_admin/settings/get_all_product_type");
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
    res.redirect("/super_admin/settings/get_all_product_type");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getAllProductType = async (req, res) => {
  try {
    res.locals.loading = true
    const { searchKeyword } = req.query;

    let product_types = [];

    
    // console.log("aaaaaaaaaaaaaaa",searchKeyword)
    if (searchKeyword) {
      const data = await knex.raw(
        `SELECT id,name,image,status FROM product_type WHERE name LIKE '%${searchKeyword}%'`
      );

      product_types = data[0]
      // console.log("inseide keyey ")
      if (product_types.length === 0) {
        res.locals.loading = false
        req.query.searchKeyword = "";
        req.flash("error", "No Product Type Found");
        return res.redirect("/super_admin/settings/get_all_product_type");
      }
    } else {
      product_types = await knex("product_type").select(
        "id",
        "name",
        "image",
        "status"
        );
      }
      
      for (let i = 0; i < product_types.length; i++) {
        product_types[i].image =
        "http://" + req.headers.host + product_types[i].image;
      }
       //console.log(product_types) 
      res.locals.loading = false
    res.render("settings/product_type", { data: product_types });
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
      return res.redirect("/super_admin/settings/get_all_product_type");
    }

    if (!req.file) {
      req.flash("error", "Please Choose a image");
      return res.redirect("/super_admin/settings/get_all_product_type");
    }

    const image = req.file.destination.slice(1) + "/" + req.file.filename;

    await knex("product_type").insert({ name, image });
    req.flash("success", "Product Type Created SuccessFully");
    res.redirect("/super_admin/settings/get_all_product_type");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getCities = async (req, res) => {
  try {
    // const categories = await knex("categories").join('product_type','categories.id','=','product_type.id')
    // .select("id", "name")
    //   // .select("id", "name", "image", "status")
    //   .where({ status: "1" });
    const City = await cities();
    res.status(200).json({ status: true, data: City });
  } catch (error) {
    res.status(500).send("Error!");
  }
  // res.render("settings/city");
  // } catch (error) {
  //   console.log(error);
  //   res.redirect("/home");
  // }
};

export const getAllCountry = async (req, res) => {
  try {
    // const categories = await knex("categories").join('product_type','categories.id','=','product_type.id')
    // .select("id", "name")
    //   // .select("id", "name", "image", "status")
    //   .where({ status: "1" });

    res.render("settings/city");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getAllZone = async (req, res) => {
  try {
    // const categories = await knex("categories").join('product_type','categories.id','=','product_type.id')
    // .select("id", "name")
    //   // .select("id", "name", "image", "status")
    //   .where({ status: "1" });

    res.render("settings/city");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getAllPostCode = async (req, res) => {
  try {
    // const categories = await knex("categories").join('product_type','categories.id','=','product_type.id')
    // .select("id", "name")
    //   // .select("id", "name", "image", "status")
    //   .where({ status: "1" });

    res.render("settings/city");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getAppSettings = async (req, res) => {
  try {
    // const categories = await knex("categories").join('product_type','categories.id','=','product_type.id')
    // .select("id", "name")
    //   // .select("id", "name", "image", "status")
    //   .where({ status: "1" });

    res.render("settings/app_settings");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getvaraitionType = async (req, res) => {
  try {
    // const categories = await knex("categories").join('product_type','categories.id','=','product_type.id')
    // .select("id", "name")
    //   // .select("id", "name", "image", "status")
    //   .where({ status: "1" });

    res.render("settings/varaition_type");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getPlan = async (req, res) => {
  try {
    // const categories = await knex("categories").join('product_type','categories.id','=','product_type.id')
    // .select("id", "name")
    //   // .select("id", "name", "image", "status")
    //   .where({ status: "1" });

    res.render("settings/plan");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};
