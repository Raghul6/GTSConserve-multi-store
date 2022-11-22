import knex from "../services/db.service";

export const createTable = async (req, res) => {
  try {
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
          t.string("location", 255).nullable();
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
          t.integer("user_group_id")
          // t.foreign("user_group_id").references("id").inTable("user_groups");
          t.string("name", 255);
          t.string("user_unique_id", 255);
          t.string("mobile_number", 255);
          t.string("user_name", 255);
          t.string("password", 255);
          t.integer("otp", 10);
          t.string("refresh_token", 255);
          t.string("email", 255).unique();
          t.timestamp("email_verified_at").nullable();
          t.timestamp("registration_date").defaultTo(knex.fn.now());
          t.enu("online_status", ["online", "offline", "squeeze"]).defaultTo(
            "online"
          );
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
          t.string("profile_photo_path", 2048).nullable();
          t.timestamp("first_otp_verified_at").nullable();
          t.timestamp("last_otp_verified_at").nullable();
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
          t.string("title", 255).nullable();
          t.string("address_details", 255).nullable();
          t.string("address_landmark", 255).nullable();
          t.string("address_name", 255).nullable();
          t.string("type", 255).nullable();
          t.enu("status", ["0", "1"]).defaultTo("1");
          t.timestamps(true, true);
        });
      }
    });

    // countries
    await knex.schema.hasTable("countries").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("countries", function (t) {
          t.increments("id").primary();
          t.string("name", 255).nullable();
          t.string("code", 255).nullable();
          t.string("phone_code", 255).nullable();
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
          t.string("code", 255).nullable();
          t.integer("country_id").unsigned().notNullable();
          t.foreign("country_id").references("id").inTable("countries");
          t.enu("status", ["0", "1"]).defaultTo("1");
          t.timestamps(true, true);
        });
      }
    });

    // cities
    await knex.schema.hasTable("cities").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("cities", function (t) {
          t.increments("id").primary();
          t.string("name", 255).nullable();
          t.string("code", 255).nullable();
          t.integer("zone_id").unsigned().notNullable();
          t.foreign("zone_id").references("id").inTable("zones");
          t.integer("country_id").unsigned().notNullable();
          t.foreign("country_id").references("id").inTable("countries");
          t.string("latitute", 255).nullable();
          t.string("longitute", 255).nullable();
          t.enu("status", ["0", "1"]).defaultTo("1");
          t.timestamps(true, true);
        });
      }
    });

    // postcodes
    await knex.schema.hasTable("postcodes").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("postcodes", function (t) {
          t.increments("id").primary();
          t.string("code", 255).nullable();
          t.integer("zone_id").unsigned().notNullable();
          t.foreign("zone_id").references("id").inTable("zones");
          t.integer("country_id").unsigned().notNullable();
          t.foreign("country_id").references("id").inTable("countries");
          t.integer("city_id").unsigned().notNullable();
          t.foreign("city_id").references("id").inTable("cities");
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
          t.integer("product_type_id").unsigned().notNullable();
          t.foreign("product_type_id").references("id").inTable("product_type");
          t.enu("status", ["0", "1"]).defaultTo("1");
          t.timestamps(true, true);
        });
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

          t.string("name", 255).nullable();
          t.text("description").nullable();
          t.text("image").nullable();
          t.text("thumbnail_image").nullable();
          t.enu("status", ["0", "1"]).defaultTo("1");
          t.timestamps(true, true);
        });
      }
    });

    // product variation
    // await knex.schema.hasTable("product_variations").then(function (exists) {
    //   if (!exists) {
    //     return knex.schema.createTable("product_variations", function (t) {
    //       t.increments("id").primary();
    //       t.integer("product_id").unsigned().notNullable();
    //       t.foreign("product_id").references("id").inTable("products");
    //       t.integer("variation_type_id").unsigned().notNullable();
    //       t.foreign("variation_type_id")
    //         .references("id")
    //         .inTable("variation_types");

    //       t.integer("value").nullable();
    //       t.integer("price").nullable();

    //       t.enu("status", ["0", "1"]).defaultTo("1");
    //       t.timestamps(true, true);
    //     });
    //   }
    // });

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

              t.date("start_date").notNullable();
              t.json("customized_days").notNullable();

              t.integer("user_address_id").unsigned().notNullable();
              t.foreign("user_address_id")
                .references("id")
                .inTable("user_address");

              t.integer("product_id").unsigned().notNullable();
              t.foreign("product_id").references("id").inTable("products");

              t.integer("quantity").notNullable();

              t.enu("subscription_status", [
                "pending",
                "approved",
                "cancelled",
              ]).defaultTo("pending");
              t.enu("status", ["0", "1"]).defaultTo("1");
              t.timestamps(true, true);
            }
          );
        }
      });

    //weekdays
    // user address
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

    //rider details

    await knex.schema.hasTable("rider_details").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("rider_details", function (t) {
          t.increments("id").primary().unsigned().notNullable();
          t.string("user_name", 255).notNullable();
          t.string("location", 255).nullable();
          t.string("password", 255).notNullable();
          t.string("address", 255).notNullable();
          t.enu("status", ["0", "1"]).defaultTo("1");
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
