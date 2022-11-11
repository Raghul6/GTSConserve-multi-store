import knex from "../../../services/db.service";

export const getAllProductType = async (req, res) => {
  try {
    const product_types = await knex("product_type")
      .select("id", "name", "image", "status")
      .where({ status: "1" });

    res.render("settings/product_type", { data: product_types });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const createProductType = async (req, res) => {
  try {
    const { name, image } = req.body;
    console.log(image)
    const base64ToBuffer = new Buffer(image, 'base64');//Convert to base64
    console.log(base64ToBuffer)
    res.send("lool")
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getCategoryType = async (req, res) => {
  try {
    // const categories = await knex("categories").join('product_type','categories.id','=','product_type.id')
    // .select("id", "name")
    //   // .select("id", "name", "image", "status")
    //   .where({ status: "1" });

    res.render("settings/category");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};
