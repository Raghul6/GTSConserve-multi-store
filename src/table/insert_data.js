import knex from "../services/db.service";
import bcrypt from "bcrypt";

import {banners,user_groups,variation_types} from "../seeds/dummy_data"


export const insertData = async (req, res) => {
    try {
      // get random id
      function get_random_id(arr) {
        return arr[Math.floor(Math.random() * arr.length)].id;
      }

    //banners
    await knex("banners").insert(banners);

    //user_groups
    await knex("user_groups").insert(user_groups);

    // admin_users
    let password = await bcrypt.hash("admin2022", 10);
    await knex("admin_users").insert({
      user_group_id: 1,
      name: "superadmin",
      email: "superadmin@gmail.com",
      password,
    });

    // // units_type 
    // await knex("units_type").insert(variation_types);

      return res
      .status(200)
      .json({ status: true, message: "Successfully data inserted" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Error at seeding data" });
  }
};
