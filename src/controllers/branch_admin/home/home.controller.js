import knex from "../../../services/db.service";
import moment from "moment";
import { customizedDay } from "../../../utils/helper.util";

export const getHomePage = async (req, res) => {
  try {
    res.render("branch_admin/home/home");
  } catch (error) {
    console.log(error);
    return res.redirect("/home");
  }
};

export const updateDailyTask = async (req, res) => {
  try {
    const { admin_id } = req.body;
    // need to delete(empty) the daily order

    //   const assigned_date = moment(date).format("YYYY-MM-DD");
    const today_date = moment().format("YYYY-MM-DD");

    const today_customers = await knex("subscribed_user_details")
      .select(
        "id",
        "branch_id",
        "user_id",
        "date",
        "product_id",
        "router_id",
        "user_address_id",
        "quantity",
        "subscribe_type_id",
        "customized_days"
      )
      .where({
        date: today_date,
        branch_id: admin_id,
        subscription_status: "subscribed",
      });

    if (today_customers.length === 0) {
      req.flash("error", "No Customer Found For Today");
      return res.redirect("/auth/home/update_daily_task");
    }

    // need to check paused date table
    // need to add add_on_product id in daily order table

    today_customers.map(async (data) => {
      // need to get rider id based on router id
      let rider_id = await knex("routes")
        .select("rider_id")
        .where({ id: data.router_id });

 

    
      // before update the date need to check that if next update date is availble in paused date is it availble then choose another date

      let date;
      if (data.subscribe_type_id == "1") {
        date = moment(data.date, "YYYY-MM-DD").add(1, "days");
      } else if (data.subscribe_type_id == "2") {
        date = moment(data.date, "YYYY-MM-DD").add(2, "days");
      } else if (data.subscribe_type_id == "3") {
        // date = moment(date).format("d");

        const customized_date = await customizedDay(
          data.date,
          data.customized_days
        );

        date = customized_date;
      }

     
      await knex("subscribed_user_details")
      .update({ date: date.format("YYYY-MM-DD HH:mm:ss") })
      .where({ id: data.id });

        await knex("daily_orders").insert({
            branch_id: admin_id,
            user_id: data.user_id,
            date: data.date,
            product_id: data.product_id,
            router_id: data.router_id,
            rider_id: rider_id[0].rider_id,
            user_address_id: data.user_address_id,
            subscription_id: data.id,
            qty: data.quantity,
          });
          rider_id = "";

    });


    res.redirect("/home/home");
  } catch (error) {
    console.log(error);
    return res.redirect("/home");
  }
};
