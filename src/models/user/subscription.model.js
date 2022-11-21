import knex from "../../services/db.service";

export const new_subscription = async (
  userId,
  subscription_plan_id,
  product_id,
  user_address_id,
  start_date,
  qty,
  customized_days
) => {
  try {
    let query = {
      start_date,
      user_id: userId,
      product_id,
      user_address_id,
      quantity: qty,
      subscribe_type_id : subscription_plan_id,
    };

    if (subscription_plan_id == 3) {
      let weekdays = await knex("weekdays").select("id", "name");
      let store_weekdays = [];
      for (let i = 0; i < customized_days.length; i++) {
        for (let j = 0; j < weekdays.length; j++) {
          if (weekdays[j].id == customized_days[i]) {
            store_weekdays.push(weekdays[j].name);
          }
        }
      }
      query.customized_days = JSON.stringify(store_weekdays);
    }

    await knex("subscribed_user_details").insert(query);

    return { status: true };
  } catch (error) {
    console.log(error);
    return { status: false, message: error };
  }
};
