export const getAddOnProduct = async (req, res) => {
    try {
      // const categories = await knex("categories").join('product_type','categories.id','=','product_type.id')
      // .select("id", "name")
      //   // .select("id", "name", "image", "status")
      //   .where({ status: "1" });
  
      res.render("super_admin/reports/add_on_product");
    } catch (error) {
      console.log(error);
      res.redirect("/home");
    }
  };
