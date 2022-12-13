import { sub } from "date-fns";
import knex from "../../../services/db.service";
import { getPageNumber } from "../../../utils/helper.util";

export const getusers = async (req, res) => {
  try {
    const { admin_id } = req.body;
    let loading = true;
    const { searchKeyword } = req.query;

 


    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT  users.name,users.user_unique_id  FROM  user_address
        JOIN users ON users.id = user_address.user_id
        WHERE user_address.branch_id= ${admin_id} AND users.name LIKE '%${searchKeyword}%'`
      );   
      // JOIN add_on_orders ON add_on_orders.branch_id = subscribed_user_details.branch_id 
      data_length = search_data_length[0];
     
      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No User  Found");
        return res.redirect("/branch_admin/users/users");
      }
    } else {
      data_length = await knex("user_address")
        .select("id")
        .where({branch_id: admin_id });
    }
    const routes = await knex("users")
      .select("name", "id")
      .where({ status: "1" });

    if (data_length.length === 0) {
      loading = false;
      return res.render("branch_admin/users/users", {
        data: data_length,
        searchKeyword,
        routes,
      });
    }

    let {
      startingLimit,
      page,
      resultsPerPage,
      numberOfPages,
      iterator,
      endingLink,
    } = await getPageNumber(req, res, data_length, "users/users");


    let results;
    // let results1;
    let is_search = false;
    if (searchKeyword) {

      
      results = await knex.raw(
        `SELECT sub.id ,users.name as user_name,sub.route_id,
        sub.address,sub.landmark,users.user_unique_id as customer_id,
        subscribed_user_details.date as subscription_start_date,
        product_type.name as product_type,unit_types.value as unit_type,
        products.name as product_name,
        routes.name as route_name,
        subscription_type.name as Subscription_type,
        products.price,products.unit_value,
        categories.name as category_name,

         users.mobile_number AS mobile_number
         FROM user_address AS sub             
         JOIN users ON users.id = sub.user_id
         JOIN routes ON  routes.id = sub.route_id
         JOIN user_address_subscribe_branch ON  user_address_subscribe_branch.address_id = sub.id
         JOIN products ON  products.id = user_address_subscribe_branch.product_id
         JOIN product_type ON  product_type.id = products.product_type_id
         JOIN categories ON  categories.id = products.category_id
         JOIN unit_types ON  unit_types.id = products.unit_type_id

         JOIN subscribed_user_details ON subscribed_user_details.user_id = users.id 
         JOIN subscription_type ON subscription_type.id = subscribed_user_details.subscribe_type_id
		     WHERE sub.branch_id = ${admin_id } AND sub.id = address_id
            AND users.name LIKE '%${searchKeyword}%' `
      );
      // JOIN add_on_orders ON add_on_orders.user_id  = sub.user_id

      console.log(searchKeyword)
      is_search = true;
    } else { 
      
      results = await knex.raw(
        `SELECT sub.id ,users.name as user_name,sub.route_id,     
        sub.address,sub.landmark,users.user_unique_id as customer_id,     
        subscribed_user_details.date as subscription_start_date,    
        subscription_type.name as Subscription_type,    
        products.price,products.unit_value,     
        categories.name as category_name,    
        routes.name as route_name,     
        product_type.name as product_type,     
        unit_types.value as unit_type,    
        products.name as product_name,     
        users.mobile_number AS mobile_number 
     
      FROM user_address AS sub             
            
      left JOIN users ON users.id = sub.user_id		
      left JOIN routes ON  routes.id = sub.route_id 
     
      left JOIN user_address_subscribe_branch  as c ON c.user_id=sub.user_id
      
     left JOIN products ON  products.id = c.product_id      
      left JOIN product_type ON  product_type.id = products.product_type_id     
      left JOIN categories ON  categories.id = products.category_id     
      left JOIN unit_types ON  unit_types.id = products.unit_type_id		 
      left JOIN subscribed_user_details ON subscribed_user_details.user_id = users.id 		
      left JOIN subscription_type ON subscription_type.id = subscribed_user_details.subscribe_type_id   
      WHERE sub.branch_id = ${admin_id}`
      );
      

    }
 



    const data = results[0];
    const product = [];

    // for (let i = 0; i < data.length; i++) {
    //   data[i].start_date = data[i].start_date.toString().slice(4, 16);
    //   if (data[i].subscription_start_date) {
    //     data[i].subscription_start_date = data[i].subscription_start_date
    //       .toString()
    //       .slice(4, 16);
    //   }
      // const product = [];

      for (let j=0 ;j<data.length;j++){
        product.push({
          customer_id: data[j].customer_id,
          user_name: data[j].user_name,
          address: data[j].address,
          route_name: data[j].route_name,
          mobile_number : data[j].mobile_number,
          landmark : data[j].landmark,
          subscription_start_date : data[j].subscription_start_date,
          Subscription_type : data[j].Subscription_type,
          product_name : data[j].product_name,
          product_type : data[j].product_type,
          price: data[j].price,
          unit_value : data[j].unit_value,
          category_name : data[j].category_name,
          unit_type : data[j].unit_type
        });
      }
    // }
    // products.price,products.unit_value,

    // console.log(product)


    

    loading = false;
    
    res.render("branch_admin/users/users", {
      data: product,
      page,
      iterator,
      endingLink,
      numberOfPages,
      is_search,
      searchKeyword,
      loading,
      routes,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};
