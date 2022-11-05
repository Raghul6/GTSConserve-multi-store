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
          t.string("name", 255).notNullable();
          t.string("email", 255).unique().notNullable();
          t.datetime("email_verified_at").nullable();
          t.string("password", 255).notNullable();
          t.text("two_factor_secret").nullable();
          t.text("two_factor_recovery_codes").nullable();
          t.datetime("two_factor_confirmed_at").nullable();
          t.enu("status", ["0", "1"]).defaultTo("1");
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
          t.integer("user_group_id").unsigned().notNullable();
          t.foreign("user_group_id").references("id").inTable("user_groups");
          t.string("name", 255);
          t.string("mobile_number", 255);
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
          t.enu("app_os_format", ["android", "ios", "website"]).defaultTo("android");
          t.enu("status", ["0", "1"]).defaultTo("1");
          t.string("remember_token", 100).nullable();
          t.string("profile_photo_path", 2048).nullable();
          t.timestamp("first_otp_verified_at").nullable();
          t.timestamp("last_otp_verified_at").nullable();
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
