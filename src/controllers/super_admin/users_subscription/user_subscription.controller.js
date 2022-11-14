export const getApproveList = async (req, res) => {
    try {
      // const categories = await knex("categories").join('product_type','categories.id','=','product_type.id')
      // .select("id", "name")
      //   // .select("id", "name", "image", "status")
      //   .where({ status: "1" });
  
      res.render("users_subscription/approve");
    } catch (error) {
      console.log(error);
      res.redirect("/home");
    }
  };

  export const getPendingList = async (req, res) => {
    try {
      // const categories = await knex("categories").join('product_type','categories.id','=','product_type.id')
      // .select("id", "name")
      //   // .select("id", "name", "image", "status")
      //   .where({ status: "1" });
  
      res.render("users_subscription/pending");
    } catch (error) {
      console.log(error);
      res.redirect("/home");
    }
  };

  export const getCancelList = async (req, res) => {
    try {
      // const categories = await knex("categories").join('product_type','categories.id','=','product_type.id')
      // .select("id", "name")
      //   // .select("id", "name", "image", "status")
      //   .where({ status: "1" });
  
      res.render("users_subscription/cancel");
    } catch (error) {
      console.log(error);
      res.redirect("/home");
    }
  };