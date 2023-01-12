
import knex from "../services/db.service";

export const createTable = async (req, res) => {
  try {
    // countries
    // await knex.schema.hasTable("countries").then(function (exists) {
    //   if (!exists) {
    //     return knex.schema.createTable("countries", function (t) {
    //       t.increments("id").primary();
    //       t.string("name", 255).nullable();
    //       t.string("code", 255).nullable();
    //       t.string("phone_code", 255).nullable();
    //       t.enu("status", ["0", "1"]).defaultTo("1");
    //       t.timestamps(true, true);
    //     });
    //   }
    // });

    // cities
    await knex.schema.hasTable("cities").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("cities", function (t) {
          t.increments("id").primary();
          t.string("name", 255).nullable();
          t.string("latitude", 255).nullable();
          t.string("longitude", 255).nullable();
          t.enu("status", ["0", "1"]).defaultTo("1");
          t.timestamps(true, true);
        });
      }
    });

    // zones
    await knex.schema.hasTable("zones").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("zones", function (t) {
          t.increments("id").primary();
          t.string("name", 255).nullable();
          t.integer("city_id").unsigned().notNullable();
          t.foreign("city_id").references("id").inTable("cities");
          t.string("latitude", 255).nullable();
          t.string("longitude", 255).nullable();
          t.enu("status", ["0", "1"]).defaultTo("1");
        });
      }
    });

    // users groups - is user or branch admin or super admin
    await knex.schema.hasTable("user_groups").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("user_groups", function (t) {
          t.increments("id").primary();
          t.string("name", 255);
          t.enu("status", ["0", "1"]).defaultTo("1");
          t.timestamps(true, true);
        });
      }
    });

    //admin users
    await knex.schema.hasTable("admin_users").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("admin_users", function (t) {
          t.increments("id").primary().unsigned().notNullable();
          t.integer("user_group_id").unsigned().notNullable();
          t.foreign("user_group_id").references("id").inTable("user_groups");
          t.string("first_name", 255).notNullable();
          t.string("last_name", 255).nullable();
          t.string("incharge_name", 255).nullable();

          t.integer("zone_id").unsigned().nullable();
          t.foreign("zone_id").references("id").inTable("zones");
          t.string("address", 255).nullable();
          t.string("location", 255).nullable();
          t.string("latitude", 255).nullable();
          t.string("longitude", 255).nullable();
          t.string("mobile_number", 255).nullable();
          t.string("alternate_mobile_number", 255).nullable();
          t.string("email", 255).unique().notNullable();
          t.string("alternate_email", 255).unique().nullable();
          t.datetime("email_verified_at").nullable();
          t.string("password", 255).notNullable();
          t.text("two_factor_secret").nullable();
          t.text("two_factor_recovery_codes").nullable();
          t.datetime("two_factor_confirmed_at").nullable();
          t.enu("status", ["0", "1"]).defaultTo("1");
          t.enu("is_password_change", ["0", "1"]).defaultTo("0");
          t.string("remember_token", 100).nullable();
          t.bigint("current_team_id").nullable();
          t.string("profile_photo_path", 2048).nullable();
          t.timestamps(true, true);
        });
      }
    });

    //users
    await knex.schema.hasTable("users").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("users", function (t) {
          t.increments("id").primary();
          t.integer("user_group_id");
          // t.foreign("user_group_id").references("id").inTable("user_groups");
          t.string("name", 255);
          t.string("user_unique_id", 255);
          t.string("mobile_number", 255).unique();
          t.string("user_name", 255);
          t.string("password", 255);
          t.integer("otp", 10);
          t.string("monthly_amount", 255).nullable();
          t.string("refresh_token", 255);
          t.string("email", 255);
          t.timestamp("email_verified_at").nullable();
          t.timestamp("registration_date").defaultTo(knex.fn.now());
          t.enu("online_status", ["online", "offline", "squeeze"]).defaultTo(
            "online"
          );
          t.enu("bottle_status", ["0", "1"]).defaultTo(
            "1"
          );
          t.integer("total_one_liter", 255);
          t.integer("total_half_liter", 255);
          t.integer("one_liter_in_hand", 255);
          t.integer("half_liter_in_hand", 255);
          t.integer("one_liter_in_return", 255);
          t.integer("half_liter_in_return", 255);
          t.integer("today_one_liter", 255);
          t.integer("today_half_liter", 255);
          t.string("device", 255).nullable();
          t.string("longitude", 255).nullable();
          t.string("latitude", 255).nullable();
          t.string("fcm_token", 255).nullable();
          t.string("app_version", 255).nullable();
          t.enu("app_os_format", ["android", "ios", "website"]).defaultTo(
            "android"
          );
          t.enu("status", ["0", "1"]).defaultTo("1");
          t.string("remember_token", 100).nullable();
          t.string("image", 2048).nullable();
          // t.string("razorpay_payment_id", 255);
          // t.string("razorpay_signature_id", 255);
          t.timestamp("first_otp_verified_at").nullable();
          t.timestamp("last_otp_verified_at").nullable();
          t.timestamps(true, true);
        });
      }
    });

    // rider details
    await knex.schema.hasTable("rider_details").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("rider_details", function (t) {
          t.increments("id").primary().unsigned().notNullable();

          t.string("name", 255).notNullable();
          t.string("user_name", 255).notNullable();
          t.string("mobile_number", 255).nullable();
          t.string("latitude", 255).nullable();
          t.string("longitude", 255).nullable();

          t.integer("branch_id").unsigned().nullable();
          t.foreign("branch_id").references("id").inTable("admin_users");

          t.string("password", 255).notNullable();
          t.string("address", 255).nullable();
          t.enu("online_status", ["0", "1"]).defaultTo("1");
          t.enu("login_status", ["0", "1"]).defaultTo("1");
          t.enu("tour_status", ["0", "1", "2"]).defaultTo("0");
          t.enu("status", ["0", "1", "2"]).defaultTo("1");
          t.timestamps(true, true);
        });
      }
    });

    //  router
    await knex.schema.hasTable("routes").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("routes", function (t) {
          t.increments("id").primary().unsigned().notNullable();

          t.integer("rider_id").unsigned().nullable();
          t.foreign("rider_id").references("id").inTable("rider_details");

          t.integer("branch_id").unsigned().notNullable();
          t.foreign("branch_id").references("id").inTable("admin_users");

          t.json("user_mapping").nullable();

          t.string("name", 255).nullable();
          // t.string("ending_point", 255).nullable();

          t.enu("status", ["0", "1"]).defaultTo("1");
          t.timestamps(true, true);
        });
      }
    });

    // user address
    await knex.schema.hasTable("user_address").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("user_address", function (t) {
          t.increments("id").primary();

          t.integer("user_id").unsigned().notNullable();
          t.foreign("user_id").references("id").inTable("users");

          t.integer("branch_id").unsigned().nullable();
          t.foreign("branch_id").references("id").inTable("admin_users");

          t.integer("router_id").unsigned().nullable();
          t.foreign("router_id").references("id").inTable("routes");

          t.string("title", 255).nullable();
          t.string("address", 255).nullable();
          t.string("landmark", 255).nullable();
          t.string("alternate_mobile", 255).nullable();
          t.string("latitude", 255).nullable();
          t.string("longitude", 255).nullable();

          t.string("type", 255).nullable();
          t.enu("status", ["0", "1"]).defaultTo("1");
          t.timestamps(true, true);
        });
      }
    });

    //app settings
    await knex.schema.hasTable("app_settings").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("app_settings", function (t) {
          t.increments("id").primary().unsigned().notNullable();
          t.string("name", 255).nullable();
          t.string("key", 255).unique().notNullable();
          t.string("value", 255).unique().notNullable();
          t.enu("status", ["0", "1"]).defaultTo("1");
          t.timestamps(true, true);
        });
      }
    });

    //coupons
    await knex.schema.hasTable("coupons").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("coupons", function (t) {
          t.increments("id").primary().unsigned().notNullable();
          t.string("name", 255).nullable();
          t.string("coupon_code", 255).nullable();
          t.string("image", 255).nullable();
          // t.string("promo_string", 255).nullable();
          t.integer("admin_id").unsigned().notNullable();
          t.foreign("admin_id").references("id").inTable("admin_users");
          t.integer("discount").nullable();
          t.integer("minimum_amount").nullable();
          t.integer("maximum_discount_amount").nullable();
          t.integer("minimum_billing_amount").nullable();
          t.enu("discount_type", ["percentage", "flat"]).defaultTo(
            "percentage"
          );
          t.enu("status", ["0", "1"]).defaultTo("1");
          t.timestamps(true, true);
        });
      }
    });

    // banners
    await knex.schema.hasTable("banners").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("banners", function (t) {
          t.increments("id").primary();
          t.string("name", 255).nullable();
          t.string("image", 255).nullable();
          t.enu("status", ["0", "1"]).defaultTo("1");
          t.timestamps(true, true);
        });
      }
    });

    //tax
    await knex.schema.hasTable("tax_types").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("tax_types", function (t) {
          t.increments("id").primary().unsigned().notNullable();
          t.string("name", 255).nullable();
          t.integer("tax_rate").nullable();
          t.enu("status", ["0", "1"]).defaultTo("1");
          t.timestamps(true, true);
        });
      }
    });

    //product type
    await knex.schema.hasTable("product_type").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("product_type", function (t) {
          t.increments("id").primary().unsigned().notNullable();
          t.string("name", 255).nullable();
          t.string("image", 255).nullable();
          t.enu("status", ["0", "1"]).defaultTo("1");
          t.timestamps(true, true);
        });
      }
    });

    //categories
    await knex.schema.hasTable("categories").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("categories", function (t) {
          t.increments("id").primary();
          t.string("name", 255);
          t.string("image", 255);
          // t.integer("product_type_id").unsigned().notNullable();
          // t.foreign("product_type_id").references("id").inTable("product_type");
          t.enu("status", ["0", "1"]).defaultTo("1");
          t.timestamps(true, true);
        });
      }
    });

    //categories by product type
    await knex.schema
      .hasTable("categories_product_type")
      .then(function (exists) {
        if (!exists) {
          return knex.schema.createTable(
            "categories_product_type",
            function (t) {
              t.increments("id").primary();

              t.integer("category_id").unsigned().notNullable();
              t.foreign("category_id").references("id").inTable("categories");

              t.integer("product_type_id").unsigned().notNullable();
              t.foreign("product_type_id")
                .references("id")
                .inTable("product_type");

              t.timestamps(true, true);
            }
          );
        }
      });

    // variation_types
    await knex.schema.hasTable("unit_types").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("unit_types", function (t) {
          t.increments("id").primary();
          t.string("name", 255).nullable();
          t.string("value", 255).nullable();
          t.enu("status", ["0", "1"]).defaultTo("1");
          t.timestamps(true, true);
        });
      }
    });

    // subscription type
    await knex.schema.hasTable("subscription_type").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("subscription_type", function (t) {
          t.increments("id").primary();
          t.string("name", 255).nullable();
          t.enu("status", ["0", "1"]).defaultTo("1");
          t.timestamps(true, true);
        });
      }
    });

    // products
    await knex.schema.hasTable("products").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("products", function (t) {
          t.increments("id").primary();

          t.integer("category_id").unsigned().notNullable();
          t.foreign("category_id").references("id").inTable("categories");

          t.integer("unit_type_id").unsigned().notNullable();
          t.foreign("unit_type_id").references("id").inTable("unit_types");

          t.integer("product_type_id").unsigned().notNullable();
          t.foreign("product_type_id").references("id").inTable("product_type");

          t.integer("unit_value").notNullable();
          t.integer("price").notNullable();
          // t.integer("subscription_type_id").unsigned().notNullable();
          // t.foreign("subscription_type_id")
          //   .references("id")
          //   .inTable("subscription_type");

          t.string("branch_price", 255).nullable();
          t.integer("demo_price").nullable();
          t.string("name", 255).nullable();
          t.text("description").nullable();
          t.text("image").nullable();
          t.text("thumbnail_image").nullable();
          t.enu("status", ["0", "1"]).defaultTo("1");
          t.timestamps(true, true);
        });
      }
    });

    //weekdays
    await knex.schema.hasTable("weekdays").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("weekdays", function (t) {
          t.increments("id").primary();
          t.string("name", 255).nullable();
          t.string("code", 255).nullable();
          t.enu("status", ["0", "1"]).defaultTo("1");
          t.timestamps(true, true);
        });
      }
    });

    // feed back message
    await knex.schema.hasTable("feedback_message").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("feedback_message", function (t) {
          t.increments("id").primary().unsigned().notNullable();

          t.text("message").notNullable();
          t.enu("status", ["0", "1"]).defaultTo("1");
          t.timestamps(true, true);
        });
      }
    });

    // // feed back
    await knex.schema.hasTable("feedbacks").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("feedbacks", function (t) {
          t.increments("id").primary();

          t.integer("user_id").unsigned().notNullable();
          t.foreign("user_id").references("id").inTable("users");

          t.text("comments").nullable();

          t.integer("message_id").unsigned().notNullable();
          t.foreign("message_id").references("id").inTable("feedback_message");

          t.timestamps(true, true);
        });
      }
    });

    

    //  subscribed user details
    await knex.schema
      .hasTable("subscribed_user_details")
      .then(function (exists) {
        if (!exists) {
          return knex.schema.createTable(
            "subscribed_user_details",
            function (t) {
              t.increments("id").primary();

              t.integer("user_id").unsigned().notNullable();
              t.foreign("user_id").references("id").inTable("users");

              t.integer("subscribe_type_id").unsigned().notNullable();
              t.foreign("subscribe_type_id")
                .references("id")
                .inTable("subscription_type");

              t.integer("branch_id").unsigned().nullable();
              t.foreign("branch_id").references("id").inTable("admin_users");

              t.integer("router_id").unsigned().nullable();
              t.foreign("router_id").references("id").inTable("routes");

              t.date("date").nullable();
              t.date("start_date").notNullable();
              t.date("assigned_date").nullable();
              t.date("subscription_start_date").nullable();

              t.json("customized_days").nullable();

              t.integer("user_address_id").unsigned().notNullable();
              t.foreign("user_address_id")
                .references("id")
                .inTable("user_address");

              t.integer("change_plan_id").unsigned().nullable();
              t.foreign("change_plan_id")
                .references("id")
                .inTable("subscription_users_change_plan");

              t.date("change_start_date").nullable();

              t.integer("product_id").unsigned().notNullable();
              t.foreign("product_id").references("id").inTable("products");

              t.integer("quantity").notNullable();

              t.integer("subscription_monthly_price").nullable();
              t.integer("additional_monthly_price").nullable();
              t.integer("total_monthly_price").nullable();
              t.integer("subscription_delivered_quantity").nullable();
              t.integer("additional_delivered_quantity").nullable();
              t.integer("total_delivered_quantity").nullable();
              t.integer("no_delivered_days").nullable();


              t.enu("subscription_status", [
                "pending",
                "assigned",
                "cancelled",
                "subscribed",
                "unsubscribed",
                "branch_cancelled",
                "branch_pending",
                "change_date",
                "change_qty",
                "change_address",
                "change_plan",
              ]).defaultTo("pending");
              t.enu("rider_status", [
                "pending",
                "delivered",
                "undelivered",
              ]).defaultTo("pending");
              t.enu("status", ["0", "1"]).defaultTo("1");
              t.timestamps(true, true);
            }
          );
        }
      });


      // subscription_users_change_plan
    await knex.schema
    .hasTable("subscription_users_change_plan")
    .then(function (exists) {
      if (!exists) {
        return knex.schema.createTable(
          "subscription_users_change_plan",
          function (t) {
            t.increments("id").primary();

            t.integer("user_id").unsigned().notNullable();
            t.foreign("user_id").references("id").inTable("users");

            t.integer("subscribe_type_id").unsigned().notNullable();
            t.foreign("subscribe_type_id")
              .references("id")
              .inTable("subscription_type");

            t.integer("previous_subscription_type_id").nullable();
            t.integer("change_subscription_type_id").nullable();

            t.date("start_date").nullable();
            t.json("customized_days").nullable();

            t.timestamps(true, true);
          }
        );
      }
    });

    // add on orders
    await knex.schema.hasTable("add_on_orders").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("add_on_orders", function (t) {
          t.increments("id").primary();

          t.integer("user_id").unsigned().notNullable();
          t.foreign("user_id").references("id").inTable("users");

          t.integer("branch_id").unsigned().nullable();
          t.foreign("branch_id").references("id").inTable("admin_users");

          t.integer("address_id").unsigned().notNullable();
          t.foreign("address_id").references("id").inTable("user_address");

          t.date("delivery_date").nullable();

          t.enu("status", [
            "pending",
            "delivered",
            "undelivered",
            "assigned",
            "cancelled",
            "branch_pending",
            "branch_cancelled",
            "new_order",
            "removed",
            "order_placed",
          ]).defaultTo("pending");

          t.enu("is_bill_generated",["0","1"]).defaultTo("0");

          t.integer("tip_amount").nullable();
          t.integer("grand_total").nullable();
          t.integer("sub_total").nullable();
          t.integer("coupon_id").nullable();
          t.string("coupon_code").nullable();
          t.integer("coupon_amount").nullable();
          t.timestamps(true, true);
        });
      }
    });

    // add on order items
    await knex.schema.hasTable("add_on_order_items").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("add_on_order_items", function (t) {
          t.increments("id").primary();

          t.integer("add_on_order_id").unsigned().nullable();
          t.foreign("add_on_order_id")
            .references("id")
            .inTable("add_on_orders");

          t.integer("user_id").unsigned().notNullable();
          t.foreign("user_id").references("id").inTable("users");

          t.integer("product_id").unsigned().notNullable();
          t.foreign("product_id").references("id").inTable("products");

          t.enu("status", [
            "pending",
            "delivered",
            "undelivered",
            "removed",
            "cancelled",
          ]).defaultTo("pending");
          t.enu("remove_status", [
            "0","1",
          ]).defaultTo("0");
          t.string("quantity", 255).nullable();
          t.integer("tax_price").nullable();
          t.integer("price").nullable();
          t.integer("total_price").nullable();
          t.integer("tax_id").nullable();

          t.timestamps(true, true);
        });
      }
    });

    // additional order parent
    await knex.schema
      .hasTable("additional_orders_parent")
      .then(function (exists) {
        if (!exists) {
          return knex.schema.createTable(
            "additional_orders_parent",
            function (t) {
              t.increments("id").primary();

              t.integer("subscription_id").unsigned().nullable();
              t.foreign("subscription_id")
                .references("id")
                .inTable("subscribed_user_details");

              t.integer("user_id").unsigned().notNullable();
              t.foreign("user_id").references("id").inTable("users");

              t.integer("month").nullable();

              t.timestamps(true, true);
            }
          );
        }
      });

    // additional orders
    await knex.schema.hasTable("additional_orders").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("additional_orders", function (t) {
          t.increments("id").primary();

          t.integer("additional_orders_parent_id").unsigned().nullable();
          t.foreign("additional_orders_parent_id")
            .references("id")
            .inTable("additional_orders_parent");

          t.integer("subscription_id").unsigned().nullable();
          t.foreign("subscription_id")
            .references("id")
            .inTable("subscribed_user_details");

          t.integer("user_id").unsigned().notNullable();
          t.foreign("user_id").references("id").inTable("users");

          t.date("date").nullable();

          t.enu("status", [
            "pending",
            "delivered",
            "undelivered",
            "cancelled",
          ]).defaultTo("pending");

          t.enu("is_cancelled", ["0", "1"]).defaultTo("0");

          t.integer("quantity", 255).nullable();
          t.integer("price").nullable();

          t.timestamps(true, true);
        });
      }
    });

    // paused date
    await knex.schema.hasTable("pause_dates").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("pause_dates", function (t) {
          t.increments("id").primary().unsigned().notNullable();

          t.integer("user_id").unsigned().nullable();
          t.foreign("user_id").references("id").inTable("users");

          t.integer("subscription_id").unsigned().nullable();
          t.foreign("subscription_id")
            .references("id")
            .inTable("subscribed_user_details");

          t.date("date").nullable();

          t.timestamps(true, true);
        });
      }
    });

    // daily orders
    await knex.schema.hasTable("daily_orders").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("daily_orders", function (t) {
          t.increments("id").primary().unsigned().notNullable();

          t.integer("branch_id").unsigned().notNullable();
          t.foreign("branch_id").references("id").inTable("admin_users");

          t.integer("user_id").unsigned().nullable();
          t.foreign("user_id").references("id").inTable("users");

          t.date("date").nullable();

          t.integer("subscription_id").unsigned().nullable();
          t.foreign("subscription_id")
            .references("id")
            .inTable("subscribed_user_details");

          t.integer("add_on_order_id").unsigned().nullable();
          t.foreign("add_on_order_id")
            .references("id")
            .inTable("add_on_orders");

          t.integer("additional_order_id").unsigned().nullable();
          t.foreign("additional_order_id")
            .references("id")
            .inTable("additional_orders");

          // t.integer("product_id").unsigned().nullable();
          // t.foreign("product_id").references("id").inTable("products");

          t.integer("router_id").unsigned().nullable();
          t.foreign("router_id").references("id").inTable("routes");

          // t.integer("rider_id").unsigned().nullable();
          // t.foreign("rider_id").references("id").inTable("rider_details");

          t.integer("user_address_id").unsigned().nullable();
          t.foreign("user_address_id").references("id").inTable("user_address");

          t.integer("qty").nullable();
          t.integer("additional_order_qty").nullable();
          t.integer("total_qty").nullable();

          t.integer("given_one_liter_bottle").unsigned().nullable();
          t.integer("given_half_liter_bottle").unsigned().nullable();
          t.integer("collected_one_liter_bottle").unsigned().nullable();
          t.integer("collected_half_liter_bottle").unsigned().nullable();
          t.integer("total_given_bottle").nullable();
          t.integer("total_collective_bottle").nullable();

          t.enu("status", [
            "pending",
            "started",
            "completed",
            "delivered",
            "undelivered",
            "cancelled",
          ]).defaultTo("pending");
          t.enu("tour_status", ["pending", "started", "completed"]).defaultTo(
            "pending"
          );
          t.timestamps(true, true);
        });
      }
    });

    //  // daily orders details
    //  await knex.schema.hasTable("daily_orders_details").then(function (exists) {
    //   if (!exists) {
    //     return knex.schema.createTable("daily_orders_details", function (t) {
    //       t.increments("id").primary().unsigned().notNullable();

    //       t.integer("branch_id").unsigned().notNullable();
    //       t.foreign("branch_id").references("id").inTable("admin_users");

    //       t.integer("user_id").unsigned().nullable();
    //       t.foreign("user_id").references("id").inTable("users");

    //       t.date("date").nullable();

    //       t.integer("subscription_id").unsigned().nullable();
    //       t.foreign("subscription_id")
    //         .references("id")
    //         .inTable("subscribed_user_details");

    //       t.integer("add_on_order_id").unsigned().nullable();
    //       t.foreign("add_on_order_id")
    //         .references("id")
    //         .inTable("add_on_orders");

    //       t.integer("additional_order_id").unsigned().nullable();
    //       t.foreign("additional_order_id")
    //         .references("id")
    //         .inTable("additional_orders");

    //       // t.integer("product_id").unsigned().nullable();
    //       // t.foreign("product_id").references("id").inTable("products");

    //       t.integer("router_id").unsigned().nullable();
    //       t.foreign("router_id").references("id").inTable("routes");

    //       // t.integer("rider_id").unsigned().nullable();
    //       // t.foreign("rider_id").references("id").inTable("rider_details");

    //       t.integer("user_address_id").unsigned().nullable();
    //       t.foreign("user_address_id").references("id").inTable("user_address");

    //       t.integer("qty").nullable();
    //       t.integer("additional_order_qty").nullable();

    //       t.enu("status", ["pending", "delivered", "undelivered"]).defaultTo(
    //         "pending"
    //       );
    //       t.timestamps(true, true);
    //     });
    //   }
    // });

    // Bill history
    await knex.schema.hasTable("bill_history").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("bill_history", function (t) {
          t.increments("id").primary().unsigned().notNullable();

          t.string("bill_no", 255);

          t.integer("user_id").unsigned().notNullable();
          t.foreign("user_id").references("id").inTable("users");

          t.integer("sub_total").nullable();
          t.integer("discount").nullable();
          t.integer("grand_total").nullable();
          t.string("razorpay_payment_id", 255);
          t.string("razorpay_signature_id", 255);

          t.date("date").nullable();

          t.enu("payment_status", [
            "pending",
            "success",
            "payment_failed",
          ]).defaultTo("pending");
          t.enu("status", [
            "0",
            "1",
          ]).defaultTo("0");
          t.string("razorpay_bill_id", 255);
          t.timestamps(true, true);
        });
      }
    });

    // Bill history Details
    await knex.schema.hasTable("bill_history_details").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("bill_history_details", function (t) {
          t.increments("id").primary().unsigned().notNullable();

          t.integer("bill_history_id").unsigned().notNullable();
          t.foreign("bill_history_id").references("id").inTable("bill_history");

          t.integer("add_on_order_id").unsigned().nullable();
          t.foreign("add_on_order_id")
            .references("id")
            .inTable("add_on_orders");

          t.integer("subscription_id").unsigned().nullable();
          t.foreign("subscription_id")
            .references("id")
            .inTable("subscribed_user_details");

          t.integer("subscription_price").nullable();
          t.integer("additional_price").nullable();
          t.integer("total_price").nullable();

          t.integer("subscription_qty").nullable();
          t.integer("additional_qty").nullable();
          t.integer("total_qty").nullable();

          t.timestamps(true, true);
        });
      }
    });

    // monthly paused date
    await knex.schema.hasTable("monthly_paused_dates").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("monthly_paused_dates", function (t) {
          t.increments("id").primary().unsigned().notNullable();

          t.integer("user_id").unsigned().nullable();
          t.foreign("user_id").references("id").inTable("users");

          t.integer("subscription_id").unsigned().nullable();
          t.foreign("subscription_id")
            .references("id")
            .inTable("subscribed_user_details");

          t.json("date").nullable();

          t.timestamps(true, true);
        });
      }
    });

    // price change
    await knex.schema.hasTable("price_change").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("price_change", function (t) {
          t.increments("id").primary();

          t.integer("product_id").unsigned().notNullable();
          t.foreign("product_id").references("id").inTable("products");

          t.date("changed_date").nullable();

          t.integer("old_price").nullable();
          t.integer("new_price").nullable();

          t.timestamps(true, true);
        });
      }
    });

    // monthly bill
    await knex.schema.hasTable("monthly_bill").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("monthly_bill", function (t) {
          t.increments("id").primary();

          t.string("bill_no").nullable();

          t.integer("subscription_id").unsigned().notNullable();
          t.foreign("subscription_id")
            .references("id")
            .inTable("subscribed_user_details");

          t.integer("user_id").unsigned().notNullable();
          t.foreign("user_id").references("id").inTable("users");

          t.string("date").nullable();

          t.integer("discount").nullable();
          t.integer("sub_total").nullable();
          t.integer("grand_total").nullable();

          t.enu("payment_status", ["pending", "done", "cancelled"]).defaultTo(
            "pending"
          );

          t.timestamps(true, true);
        });
      }
    });

    // user address subscribe branch
    await knex.schema
      .hasTable("user_address_subscribe_branch")
      .then(function (exists) {
        if (!exists) {
          return knex.schema.createTable(
            "user_address_subscribe_branch",
            function (t) {
              t.increments("id").primary();
              t.integer("user_id").unsigned().notNullable();
              t.foreign("user_id").references("id").inTable("users");
              t.integer("address_id").unsigned().notNullable();
              t.foreign("address_id").references("id").inTable("user_address");
              t.integer("branch_id").unsigned().notNullable();
              t.foreign("branch_id").references("id").inTable("admin_users");
              t.integer("subscription_id").unsigned().nullable();
              t.foreign("subscription_id")
                .references("id")
                .inTable("subscribed_user_details");
              t.integer("product_id").unsigned().notNullable();
              t.foreign("product_id").references("id").inTable("products");
              // t.enu("status", ["pending", "delivery", "not delivery"]).defaultTo(
              //   "pending"
              // );
              // t.string("quantity", 255).nullable();
              // t.integer("tax_price").nullable();
              // t.integer("price").nullable();
              // t.integer("total_price").nullable();
              // t.integer("tax_id").nullable();

              t.timestamps(true, true);
            }
          );
        }
      });

    // branch purchase order

    await knex.schema.hasTable("branch_purchase_order").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("branch_purchase_order", function (t) {
          t.increments("id").primary();

          t.integer("branch_id").unsigned().nullable();
          t.foreign("branch_id").references("id").inTable("admin_users");

          t.date("date").nullable();

          t.enu("status", ["pending", "approved", "cancelled"]).defaultTo(
            "pending"
          );
          t.enu("is_bill_generated", ["0", "1"]).defaultTo(
            "0"
          );
          t.integer("grand_total").nullable();

          t.timestamps(true, true);
        });
      }
    });

    // branch purchase order items
    await knex.schema
      .hasTable("branch_purchase_order_items")
      .then(function (exists) {
        if (!exists) {
          return knex.schema.createTable(
            "branch_purchase_order_items",
            function (t) {
              t.increments("id").primary();

              t.integer("branch_purchase_order_id").unsigned().nullable();
              t.foreign("branch_purchase_order_id")
                .references("id")
                .inTable("branch_purchase_order");

              t.integer("branch_id").unsigned().notNullable();
              t.foreign("branch_id").references("id").inTable("admin_users");

              t.integer("product_id").unsigned().notNullable();
              t.foreign("product_id").references("id").inTable("products");

              t.integer("product_type_id").unsigned().notNullable();
              t.foreign("product_type_id")
                .references("id")
                .inTable("product_type");

              t.enu("status", ["pending", "approved", "cancelled"]).defaultTo(
                "pending"
              );

              t.integer("price").nullable();

              t.string("qty", 255).nullable();
              t.string("excess_qty", 255).nullable();
              t.string("given_excess_qty", 255).nullable();
              t.string("total_qty", 255).nullable();

              t.string("unit_value", 255).nullable();
              t.integer("total_price").nullable();

              t.timestamps(true, true);
            }
          );
        }
      });

    // empty bottle tracking

    await knex.schema.hasTable("empty_bottle_tracking").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("empty_bottle_tracking", function (t) {
          t.increments("id").primary();
          t.integer("user_id").unsigned().notNullable();
          t.foreign("user_id").references("id").inTable("users");
          t.integer("total_one_liter").nullable();
          t.integer("total_half_liter").nullable();
          t.integer("one_liter_in_hand").nullable();
          t.integer("half_liter_in_hand").nullable();
          t.integer("one_liter_in_return").nullable();
          t.integer("half_liter_in_return").nullable();
          t.enu("status", ["0", "1"]).defaultTo("1  ");
          t.timestamps(true, true);
        });
      }
    });

    // payment_gateways table
    await knex.schema.hasTable("payment_type").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("payment_type", function (t) {
          t.increments("id").primary().unsigned().notNullable();
          t.string("image", 2048).nullable();
          t.integer("user_id").unsigned().notNullable();
          t.foreign("user_id").references("id").inTable("users");
          t.string("gatewayname", 255).nullable();
          t.string("displayname", 255).nullable();
          t.enu("status", ["0", "1"]).defaultTo("1");
          t.timestamps(true, true);
        });
      }
    });

    // payment_gateways table
    await knex.schema.hasTable("payment_gateways").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("payment_gateways", function (t) {
          t.increments("id").primary().unsigned().notNullable();
          t.string("image", 2048).nullable();
          t.integer("user_id").unsigned().notNullable();
          t.foreign("user_id").references("id").inTable("users");
          t.string("gatewayname", 255).nullable();
          t.string("displayname", 255).nullable();
          t.enu("status", ["0", "1"]).defaultTo("1");
          t.timestamps(true, true);
        });
      }
    });

    // rider daily details
    await knex.schema.hasTable("rider_daily_details").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("rider_daily_details", function (t) {
          t.increments("id").primary().unsigned().notNullable();

          t.integer("router_id").unsigned().nullable();
          t.foreign("router_id").references("id").inTable("routes");

          t.integer("rider_id").unsigned().nullable();
          t.foreign("rider_id").references("id").inTable("rider_details");

          t.integer("total_one_liter").nullable();
          t.integer("total_half_liter").nullable();
          t.integer("remainding_one_liter").nullable();
          t.integer("remainding_half_lite").nullable();
          t.integer("bottle_collected_one_liter").nullable();
          t.integer("bottle_collected_half_liter").nullable();

          t.json("order_details").nullable();

          t.enu("status", ["0", "1"]).defaultTo("1");
          t.timestamps(true, true);
        });
      }
    });

// branch bills
    await knex.schema.hasTable("branch_bills").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("branch_bills", function (t) {
          t.increments("id").primary();

          t.integer("branch_id").unsigned().nullable();
          t.foreign("branch_id").references("id").inTable("admin_users");

          t.date("generated_date").nullable();
          t.date("payed_date").nullable();
          t.date("completed_date").nullable();

          t.enu("payment_status", ["pending", "payed", "completed", "cancelled"]).defaultTo(
            "pending"
          );
          t.integer("grand_total").nullable();

          t.timestamps(true, true);
        });
      }
    });



    return res
      .status(200)
      .json({ status: true, message: "table successfully created" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Error at creating tables", error });
  }
};
