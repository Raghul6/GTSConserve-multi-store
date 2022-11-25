export const getPendingList = async (req, res) => {
    try {
      // const categories = await knex("categories").join('product_type','categories.id','=','product_type.id')
      // .select("id", "name")
      //   // .select("id", "name", "image", "status")
      //   .where({ status: "1" });
  
      res.render("super_admin/users_subscription/pending");
    } catch (error) {
      console.log(error);
      res.redirect("/home");
    }

    const branches = await knex("admin_users")
      .select("first_name", "id", "location")
      .where({ user_group_id: "2" });

    if (data_length.length === 0) {
      loading = false;
      return res.render("super_admin/users_subscription/pending", {
        data: data_length,
        searchKeyword,
        branches,
      });
    }

    let {
      startingLimit,
      page,
      resultsPerPage,
      numberOfPages,
      iterator,
      endingLink,
    } = await getPageNumber(
      req,
      res,
      data_length,
      "users_subscription/get_pending_list"
    );

    let results;
    let is_search = false;
    if (searchKeyword) {
      results = await knex.raw(
        `SELECT sub.id , sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
        user_address.address,user_address.landmark,products.name as product_name,products.price,products.unit_value,
        unit_types.value,categories.name as category_name
        FROM subscribed_user_details AS sub 
        JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id 
        JOIN users ON users.id = sub.user_id 
        JOIN user_address ON user_address.id = sub.user_address_id
        JOIN products ON products.id = sub.product_id
        JOIN unit_types ON unit_types.id = products.unit_type_id
        JOIN categories ON categories.id = products.category_id
        WHERE sub.subscription_status = "pending" 
        AND users.user_unique_id LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
      );
      is_search = true;
    } else {
      results = await knex.raw(
        `SELECT sub.id ,sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
        user_address.address,user_address.landmark,products.name as product_name,products.price,products.unit_value,
        unit_types.value,categories.name as category_name
        FROM subscribed_user_details AS sub 
        JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id 
        JOIN users ON users.id = sub.user_id 
        JOIN user_address ON user_address.id = sub.user_address_id
        JOIN products ON products.id = sub.product_id
        JOIN unit_types ON unit_types.id = products.unit_type_id
        JOIN categories ON categories.id = products.category_id
        WHERE sub.subscription_status = "pending"  LIMIT ${startingLimit},${resultsPerPage}`
      );
    }

    const data = results[0];

    for (let i = 0; i < data.length; i++) {
      data[i].start_date = data[i].start_date.toString().slice(4, 16);
    }

    loading = false;
    res.render("super_admin/users_subscription/pending", {
      data: data,
      page,
      iterator,
      endingLink,
      numberOfPages,
      is_search,
      searchKeyword,
      loading,
      branches,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updatePendingList = async (req, res) => {
  try {
    const { sub_id, branch_id } = req.body;

    await knex("subscribed_user_details")
      .update({
        branch_id,
        subscription_status: "assigned",
        assigned_date: new Date().toISOString().slice(0, 19).replace("T", " "),
      })
      .where({ id: sub_id });

    req.flash("success", "Subscription Moved To Branch");
    res.redirect("/super_admin/users_subscription/get_pending_list");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};
