// import knex from "../../../services/db.service";


export const getCities = async (req, res) => {
    try {
      // const categories = await knex("categories").join('product_type','categories.id','=','product_type.id')
      // .select("id", "name")
      //   // .select("id", "name", "image", "status")
      //   .where({ status: "1" });
  
      res.render("super_admin/places/city");
    } catch (error) {
      console.log(error);
      res.redirect("/home");
    }
  };


