import knex from "../services/queryBuilder.service";

export const createTable = async (req,res) => {
    try{

    // app_versions
    await knex.schema.hasTable("app_versions").then(function (exists){
        if(!exists){
            return knex.schema.createTable("app_versions",function (t){
                t.increments("id").primary().unsigned().notNullable();
                t.string("app_version_name", 255).nullable();
                t.date("app_version_date").nullable();
                t.string("app_version_comment", 255).nullable();
                t.timestamps(true,true);
            });
        }
    });


     // categories
     await knex.schema.hasTable("categories").then(function (exists){
        if(!exists){
            return knex.schema.createTable("categories",function (t){
                t.increments("id").primary().unsigned().notNullable();
                t.string("category_name", 100).nullable();
                t.string("category_image", 255).nullable();

                t.string("category_icon_image", 255).nullable();
                t.string("category_color", 55).nullable();

                t.integer("category_arrangement").nullable();
                t.string("description", 255).nullable();

                t.enu("category_status", ["active", "inactive"]).defaultTo("inactive");
                t.timestamps(true,true);
            });
        }
    });


    // banners
    await knex.schema.hasTable("banners").then(function (exists){
        if(!exists){
            return knex.schema.createTable("banners",function (t){
                t.increments("id").primary().unsigned().notNullable();
                t.string("banner_image", 255).nullable();

                t.integer("category_id").unsigned().nullable();
                t.foreign("category_id").references("id").inTable("categories");

                t.integer("banner_position").nullable();
                t.timestamps(true,true);
            });
        }
    });


    // units_type
    await knex.schema.hasTable("units_type").then(function (exists){
        if(!exists){
            return knex.schema.createTable("units_type",function (t){
                t.increments("id").unsigned().notNullable();
                t.string("unit_name", 255).nullable();
                t.timestamps(true,true);                 
            });
        }
    });


    // offers
    await knex.schema.hasTable("offers").then(function (exists){
        if(!exists){
            return knex.schema.createTable("offers",function (t){
                t.increments("id").unsigned().notNullable();
                t.string("offer_coupon", 255).nullable();

                t.integer("offer_percentage").nullable();
                t.integer("minimum_ordering_amount").nullable();
                t.integer("maximum_discount_amount").nullable();

                t.enu("offer_inapp_status",["0","1"]).defaultTo("1");
                t.enu("offer_status",["0","1"]).defaultTo("1");
                t.timestamps(true,true);                 
            });
        }
    });


    // failed_jobs
    await knex.schema.hasTable("failed_jobs").then(function (exists){
        if(!exists){
            return knex.schema.createTable("failed_jobs",function (t){
                t.increments("id").unsigned().notNullable();
                t.string("uuid", 255).nullable();

                t.string("connection",255).nullable();
                t.string("queue",255).nullable();

                t.string("payload",455).nullable();
                t.string("exception",455).nullable();

                t.timestamp("failed_at").nullable();
                t.timestamps(true,true);
            });
        }
    });


    // services
    await knex.schema.hasTable("services").then(function (exists){
        if(!exists){
            return knex.schema.createTable("services",function (t){
                t.increments("id").unsigned().notNullable();
                t.string("name", 255).nullable();
                t.string("image", 255).nullable();

                t.timestamps(true,true);                 
            });
        }
    });


    // timeslots
    await knex.schema.hasTable("timeslots").then(function (exists){
        if(!exists){
            return knex.schema.createTable("timeslots",function (t){
                t.increments("id").unsigned().notNullable();
                t.time("start_time").nullable();

                t.time("end_time").nullable();
                t.enu("status", ["0","1"]).defaultTo("0");
                t.timestamps(true,true);                 
            });
        }
    });


    // user_groups
    await knex.schema.hasTable("user_groups").then(function (exists){
        if(!exists){
            return knex.schema.createTable("user_groups",function (t){
                t.increments("id").unsigned().notNullable();
                t.string("name", 255).nullable();

                t.timestamps(true,true,true);                 
            });
        }
    });


    // memberships
    await knex.schema.hasTable("memberships").then(function (exists){
        if(!exists){
            return knex.schema.createTable("memberships",function (t){
                t.increments("id").unsigned().notNullable();
                t.string("name", 255).nullable();

                t.double("amount", 8,2).nullable();
                t.integer("validity").nullable();

                t.integer("delivery").nullable();
                t.integer("minimum_ordering_amount").nullable();

                t.string("description", 255).nullable();
                t.integer("month").nullable();

                t.date("expiry_date").nullable();
                t.timestamps(true,true);                 
            });
        }
    });


    // users
    await knex.schema.hasTable("users").then(function (exists){
        if(!exists){
            return knex.schema.createTable("users",function (t){
                t.increments("id").unsigned().notNullable();
                t.string("name", 255).nullable();

                t.integer("user_group_id").nullable();
                t.foreign("user_group_id").references("id").inTable("user_groups");

                t.integer("membership_id").nullable();
                t.foreign("membership_id").references("id").inTable("memberships");

                t.double("current_version", 8,2).nullable();
                t.string("phone_number", 255).nullable();

                t.string("alternate_phone_number", 255).nullable();
                t.string("device_model", 255).nullable();

                t.string("device_native", 255).nullable();
                t.string("refresh_token", 255).nullable();

                t.string("email", 255).nullable();
                t.string("fcm_token", 255).nullable();

                t.timestamp("email_verified_at").nullable();
                t.date("registration_date").nullable();

                t.integer("user_otp").nullable();
                t.integer("total_order").nullable();

                t.string("password", 255).nullable();
                t.timestamps(true,true);                 
            });
        }
    });


    // user_address
    await knex.schema.hasTable("user_address").then(function (exists){
        if(!exists){
            return knex.schema.createTable("user_address",function (t){
                t.increments("id").unsigned().notNullable();

                t.integer("user_id").unsigned().nullable();
                t.foreign("user_id").references("id").inTable("users");

                t.string("user_address_name", 255).nullable();
                t.string("user_address_details", 255).nullable();

                t.string("user_address_landmark", 255).nullable();
                t.string("user_address_latitude", 255).nullable();

                t.string("user_address_longitude", 255).nullable();
                t.timestamps(true,true);
            });
        }
    });


    // wallet_historys
    await knex.schema.hasTable("wallet_historys").then(function (exists){
        if(!exists){
            return knex.schema.createTable("wallet_historys",function (t){
                t.increments("id").unsigned().notNullable();

                t.integer("user_id").unsigned().nullable();
                t.foreign("user_id").references("id").inTable("users");

                t.integer("amount").nullable();
                t.date("date").nullable();

                t.time("time").nullable();
                t.integer("order_id").nullable();

                t.integer("type").nullable();
                t.string("message", 255).nullable();
                t.timestamps(true,true);
            });
        }
    });


    // payment_methods
    await knex.schema.hasTable("payment_methods").then(function (exists){
        if(!exists){
            return knex.schema.createTable("payment_methods",function (t){
                t.increments("id").unsigned().notNullable();
                t.string("payment_method_name", 255).nullable();

                t.enu("payment_method_status", ["0","1"]).defaultTo("0");
                t.timestamps(true,true);                 
            });
        }
    });


    // admin_users
    await knex.schema.hasTable("admin_users").then(function(exists){
        if(!exists){
            return knex.schema.createTable("admin_users",function(t){
                t.increments("id").primary().unsigned().notNullable();
                t.string("name",255).nullable();
                
                t.string("email",255).nullable();   
                t.string("password",255).nullable();

                t.string("two_factor_secret",255).nullable();
                t.string("two_factor_recovery_codes",255).nullable();
               
                t.string("remember_token",100).nullable();
                t.integer("current_team_id").nullable();
                t.string("profile_photo_path",100).nullable();
                
                t.integer("user_group_id").unsigned().nullable();
                t.foreign("user_group_id").references("id").inTable("user_groups");

                t.string("user_phone_number", 255).nullable();

                t.string("user_alternate_phone_number", 255).nullable();
                t.date("user_registration_date").nullable();
                

                t.date("last_update_date").nullable();
                t.string("version",10).nullable();

                t.string("device",255).nullable();
                t.integer("user_otp").nullable();

                t.integer("issue_code").nullable();
                t.string("refresh_token",255).nullable();

                t.integer("wallet").nullable();
                t.timestamp("email_verified_at").nullable();

                t.timestamp("two_factor_confirmed_at").nullable();
                t.timestamps(true,true);

            });
        }
    });


    // app_controls
    await knex.schema.hasTable("app_controls").then(function(exists){
        if(!exists){
            return knex.schema.createTable("app_controls",function(t){
                t.increments("id").primary().unsigned().notNullable();
                t.string("fcm_key", 255).nullable();
                
                t.string("ciper_key", 255).nullable();   
                t.string("jwt_secret", 255).nullable();

                t.string("salt_key", 255).nullable();
                t.string("map_key",255).nullable();
               
                t.integer("paytm_merchant_id").nullable();
                t.string("paytm_merchant_key", 255).nullable();

                t.integer("razorpay_merchant_id").nullable();                
                t.string("razorpay_merchant_key", 255).nullable();

                t.integer("upi_merchant_id").nullable();
                t.string("upi_merchant_key", 255).nullable();

                t.string("upi_qr_code", 255).nullable();
                t.string("app_latitude", 20).nullable();

                t.string("app_longitude", 20).nullable();
                t.string("contact_number", 20).nullable();

                t.integer("minimum_order").nullable();
                t.integer("order_distance").nullable();

                t.time("app_intime").nullable();
                t.time("app_outtime").nullable();

                t.integer("delivery_charge").nullable();
                t.integer("upto_distance").nullable();

                t.integer("increment").nullable();
                t.string("app_version",20).nullable();

                t.integer("cart_count").nullable();
                t.integer("best_selling_count").nullable();

                t.integer("eggless").nullable();
                t.integer("packing_charge").nullable();

                t.integer("peak_charge").nullable();
                t.double("sgst", 8,2).nullable();

                t.double("cgst", 8,2).nullable();
                t.double("first_order_offer", 8,2).nullable();

                t.double("second_order_offer", 8,2).nullable();
                t.double("third_order_offer", 8,2).nullable();

                t.string("contact_us",255).nullable();
                t.string("privacy_policy",255).nullable();

                t.string("about_us",255).nullable();
                t.string("terms",255).nullable();

                t.enu("self_pick_status", ["0","1"]).defaultTo("0");
                t.string("otp_message",255).nullable();

                t.string("faq",255).nullable();
                t.string("membertship_image",255).nullable();

                t.string("mt_way_image",255).nullable();
                t.string("referral_image",255).nullable();

                t.integer("referral_parent_payment").nullable();
                t.integer("referral_child_payment").nullable();

                t.timestamps(true,true);                  
            });
        }
    });


    // logins
    await knex.schema.hasTable("logins").then(function (exists){
        if(!exists){
            return knex.schema.createTable("logins",function (t){
                t.increments("id").unsigned().notNullable();

                t.integer("user_id").unsigned().nullable();
                t.foreign("user_id").references("id").inTable("users");

                t.string("password", 255).nullable();
                t.string("cipher", 255).nullable();

                t.string("login_phone_number", 255).nullable();
                t.integer("control").nullable();

                t.timestamps(true,true);                 
            });
        }
    });


    // branchs
    await knex.schema.hasTable("branchs").then(function (exists){
        if(!exists){
            return knex.schema.createTable("branchs",function (t){
                t.increments("id").unsigned().notNullable();

                t.integer("login_id").unsigned().nullable();
                t.foreign("login_id").references("id").inTable("logins");

                t.string("branch_name", 255).nullable();
                t.string("branch_image", 255).nullable();

                t.string("branch_address", 255).nullable();
                t.string("branch_phone", 255).nullable();
                t.string("branch_whatsapp", 255).nullable();

                t.time("branch_intime").nullable();
                t.time("branch_outtime").nullable();

                t.string("branch_latitude", 255).nullable();
                t.string("branch_longitude", 255).nullable();

                t.enu("branch_status", ["0","1"]).defaultTo("0");
                t.string("branch_fcm", 255).nullable();

                t.integer("packing_charge").nullable();
                t.integer("peak_charge").nullable();

                t.string("razorpay_merchant_id", 255).nullable();
                t.string("razorpay_merchant_key", 255).nullable();

                t.string("gst", 255).nullable();
                t.timestamps(true,true);                 
            });
        }
    });


    // category_status
    await knex.schema.hasTable("category_status").then(function (exists){
        if(!exists){
            return knex.schema.createTable("category_status",function (t){
                t.increments("id").unsigned().notNullable();

                t.integer("login_id").unsigned().nullable();
                t.foreign("login_id").references("id").inTable("logins");

                t.integer("category_id").unsigned().nullable();
                t.foreign("category_id").references("id").inTable("categories");

                t.timestamps(true,true);                 
            });
        }
    });


    // delivery_charges
    await knex.schema.hasTable("delivery_charges").then(function (exists){
        if(!exists){
            return knex.schema.createTable("delivery_charges",function (t){
                t.increments("id").unsigned().notNullable();
                t.integer("first_charge").nullable();  

                t.integer("last_charge").nullable();
                t.integer("amount").nullable();        
                t.timestamps(true,true);                 
            });
        }
    });


     // delivery_partners
     await knex.schema.hasTable("delivery_partners").then(function (exists){
        if(!exists){
            return knex.schema.createTable("delivery_partners",function (t){
                t.increments("id").unsigned().notNullable();

                t.integer("branch_id").unsigned().nullable();
                t.foreign("branch_id").references("id").inTable("branchs");

                t.string("delivery_partner_name", 55).nullable();
                t.string("delivery_partner_image", 255).nullable();

                t.string("delivery_partner_phone", 20).nullable();
                t.string("delivery_partner_password", 25).nullable();

                t.string("delivery_partner_cipher", 55).nullable();
                t.string("delivery_partner_latitude", 25).nullable();

                t.string("delivery_partner_longitude", 25).nullable();
                t.string("delivery_partner_address", 255).nullable();

                t.string("delivery_partner_fcm", 255).nullable();
                t.string("delivery_partner_alternate_moblie", 25).nullable();

                t.string("delivery_partner_blood_group", 25).nullable();
                t.string("delivery_partner_date_of_birth", 25).nullable();

                t.string("delivery_partner_email", 55).nullable();
                t.string("delivery_partner_gender", 25).nullable();

                t.string("delivery_partner_vehicle_name", 25).nullable();
                t.string("delivery_partner_vehicle_number", 25).nullable();

                t.date("delivery_partner_registration_date").nullable();
                t.enu("delivery_partner_online_status", ["0","1"]).defaultTo("0");

                t.enu("delivery_partner_status", ["0","1"]).defaultTo("0");
                t.timestamps(true,true);                 
            });
        }
    });


    // favorites
    await knex.schema.hasTable("favorites").then(function (exists){
        if(!exists){
            return knex.schema.createTable("favorites",function (t){
                t.increments("id").unsigned().notNullable();

                t.integer("user_id").unsigned().nullable();
                t.foreign("user_id").references("id").inTable("users");

                t.integer("product_id").nullable();          
                t.timestamps(true,true);                 
            });
        }
    });


    // franchise_enquirys
    await knex.schema.hasTable("franchise_enquirys").then(function (exists){
        if(!exists){
            return knex.schema.createTable("franchise_enquirys",function (t){
                t.increments("id").unsigned().notNullable();
                t.date("date").nullable();  

                t.string("name", 50).nullable();
                t.string("email", 50).nullable();

                t.string("phone_number", 50).nullable();
                t.string("city", 50).nullable();

                t.string("message", 255).nullable();
                t.timestamps(true,true);                 
            });
        }
    });


    // log_razorpay_webhooks
    await knex.schema.hasTable("log_razorpay_webhooks").then(function (exists){
        if(!exists){
            return knex.schema.createTable("log_razorpay_webhooks",function (t){
                t.increments("id").unsigned().notNullable();
                t.date("date").nullable();  
    
                t.time("time").nullable();
                t.string("header", 255).nullable();        
                t.timestamps(true,true);                 
            });
        }
    });


    // migrations
    await knex.schema.hasTable("migrations").then(function (exists){
        if(!exists){
            return knex.schema.createTable("migrations",function (t){
                t.increments("id").unsigned().notNullable();
                t.string("migration", 255).nullable();      
                t.integer("batch").nullable();
                              
            });
        }
    });


    // order_status
    await knex.schema.hasTable("order_status").then(function (exists){
        if(!exists){
            return knex.schema.createTable("order_status",function (t){
                t.increments("id").unsigned().notNullable();
                t.string("display_name", 255).nullable(); 
                
                t.string("string_value", 255).nullable(); 
                t.integer("int_value").nullable();

                t.string("color", 255).nullable();
                t.enu("status", ["active", "inactive"]).defaultTo("active");
                t.timestamps(true,true);
                              
            });
        }
    });


    // orders
    await knex.schema.hasTable("orders").then(function (exists){
        if(!exists){
            return knex.schema.createTable("orders",function (t){
                t.increments("id").unsigned().notNullable();
                t.string("order_id", 255).nullable();
                
                t.integer("login_id").unsigned().nullable();
                t.foreign("login_id").references("id").inTable("logins");

                t.integer("user_id").unsigned().nullable();
                t.foreign("user_id").references("id").inTable("users");

                t.integer("address_id").unsigned().nullable();
                t.foreign("address_id").references("id").inTable("user_address");

                t.integer("delivery_partner_id").unsigned().nullable();
                t.foreign("delivery_partner_id").references("id").inTable("delivery_partners");

                t.integer("payment_mode_id").unsigned().nullable();
                t.foreign("payment_mode_id").references("id").inTable("payment_methods");

                t.integer("order_status_id").unsigned().nullable();
                t.foreign("order_status_id").references("id").inTable("order_status");
                
                t.string("order_string", 255).nullable(); 
                t.date("booking_date").nullable();

                t.time("booking_time").nullable();
                t.string("user_address", 255).nullable();

                t.string("user_landmark", 255).nullable(); 
                t.string("user_longitude", 255).nullable();

                t.integer("total_amount").nullable();
                t.integer("recipe_total_amount").nullable();

                t.string("coupon_code", 255).nullable();
                t.integer("coupon_applied").nullable();

                t.integer("delivery_charge").nullable();
                t.integer("delivery_partner_distance").nullable();

                t.integer("notification").nullable();
                t.string("message", 255).nullable();

                t.string("cooking_instruction", 255).nullable();
                t.string("delivery_instruction", 255).nullable();

                t.string("comment", 255).nullable();
                t.string("rating", 255).nullable();

                t.integer("packing_charge").nullable();
                t.integer("tax").nullable();

                t.integer("peak_charge").nullable();
                t.string("payment_message", 255).nullable();

                t.string("razor_pay_id", 255).nullable();
                t.string("razorpay_order_id", 255).nullable();

                t.string("product_rating", 255).nullable();
                t.string("product_comment", 255).nullable();

                t.string("delivery_rating", 255).nullable();
                t.string("delivery_comment", 255).nullable();

                t.integer("pickup_otp").nullable();
                t.integer("delivery_otp").nullable();

                t.double("sgst", 8,2).nullable();
                t.double("cgst", 8,2).nullable();

                t.string("slot", 255).nullable();
                t.integer("order_type").nullable();

                t.integer("payment_amount").nullable();
                t.integer("wallet_amount").nullable();
                t.timestamps(true,true);                              
            });
        }
    });

    
    // password_resets
    await knex.schema.hasTable("password_resets").then(function (exists){
        if(!exists){
            return knex.schema.createTable("password_resets",function (t){
                t.increments("id").unsigned().notNullable();
                t.string("email", 255).nullable();
                 
                t.string("token", 255).nullable();
                t.timestamps(true,true);                 
            });
        }
    });


    // personal_access_tokens
    await knex.schema.hasTable("personal_access_tokens").then(function (exists){
        if(!exists){
            return knex.schema.createTable("personal_access_tokens",function (t){
                t.increments("id").unsigned().notNullable();
                t.string("tokenable_type", 255).nullable(); 

                t.integer("tokenable_id").nullable();
                t.string("name", 255).nullable(); 

                t.string("token", 255).nullable();
                t.string("abilities", 255).nullable();

                t.timestamp("last_used_at").nullable();
                t.timestamp("expires_at").nullable();
                t.timestamps(true,true);                              
            });
        }
    });


    // wallet_orders
    await knex.schema.hasTable("wallet_orders").then(function (exists){
        if(!exists){
            return knex.schema.createTable("wallet_orders",function (t){
                t.increments("id").unsigned().notNullable();
                t.string("wallet_order_string", 255).nullable(); 

                t.integer("user_id").unsigned().nullable();
                t.foreign("user_id").references("id").inTable("users");

                t.date("date").nullable();
                t.time("time").nullable();

                t.integer("amount").nullable();
                t.string("order_id", 255).nullable(); 

                t.integer("payment_mode_id").unsigned().nullable();
                t.foreign("payment_mode_id").references("id").inTable("payment_methods");

                t.enu("status", ["0", "1"]).defaultTo("0");
                t.timestamps(true,true);                              
            });
        }
    });


    // sessions
    await knex.schema.hasTable("sessions").then(function (exists){
        if(!exists){
            return knex.schema.createTable("sessions",function (t){
                t.increments("id").unsigned().notNullable(); 

                t.integer("user_id").unsigned().nullable();
                t.foreign("user_id").references("id").inTable("users");

                t.string("ip_address", 255).nullable();
                t.string("user_agent", 255).nullable();

                t.string("payload", 255).nullable();
                t.integer("last_activity").nullable();                              
            });
        }
    });


    // push_notifications
    await knex.schema.hasTable("push_notifications").then(function (exists){
        if(!exists){
            return knex.schema.createTable("push_notifications",function (t){
                t.increments("id").unsigned().notNullable(); 

                t.string("notification_title", 255).nullable();
                t.string("notification_body", 255).nullable();
                
                t.string("notification_image", 255).nullable();
                t.integer("notification_type").nullable(); 
                
                t.string("notification_url", 255).nullable();
                t.integer("notification_category_id").nullable(); 
                t.timestamps(true,true); 
            });
        }
    });


    // products
    await knex.schema.hasTable("products").then(function (exists){
        if(!exists){
            return knex.schema.createTable("products",function (t){
                t.increments("id").unsigned().notNullable();
                t.string("product_name", 255).nullable() 

                t.integer("category_id").unsigned().nullable();
                t.foreign("category_id").references("id").inTable("categories");

                t.integer("unit_id").unsigned().nullable();
                t.foreign("unit_id").references("id").inTable("units_type");

                t.string("product_image1", 255).nullable();
                t.string("product_image2", 255).nullable();
                t.string("product_image3", 255).nullable();

                t.integer("eggless").nullable();
                t.integer("timeslot").nullable();

                t.integer("product_recommended").nullable();
                t.integer("product_percentage").nullable();

                t.integer("product_demo").nullable();
                t.integer("product_price").nullable();

                t.string("product_weight", 255).nullable();
                t.string("product_pieces", 255).nullable();

                t.integer("product_serves").nullable();
                t.string("net_weight", 255).nullable();

                t.string("gross_weight", 255).nullable();
                t.integer("product_variation").nullable();

                t.enu("product_offer", ["0","1"]).defaultTo("0");
                t.enu("product_status", ["0","1"]).defaultTo("0");

                t.string("product_description", 255).nullable();
                t.string("link", 255).nullable();
                t.timestamps(true,true);                                            
            });
        }
    });


    // product_prices
    await knex.schema.hasTable("product_prices").then(function (exists){
        if(!exists){
            return knex.schema.createTable("product_prices",function (t){
                t.increments("id").unsigned().notNullable(); 

                t.integer("product_id").unsigned().nullable();
                t.foreign("product_id").references("id").inTable("products");

                t.integer("unit_id").unsigned().nullable();
                t.foreign("unit_id").references("id").inTable("units_type");

                t.string("product_variation", 255).nullable();
                t.integer("product_demo_price").nullable();
                t.integer("product_price").nullable();

                t.string("product_weight", 255).nullable()
                t.string("product_piece_count", 255).nullable()

                t.integer("product_serves").nullable();
                t.timestamps(true,true);                                            
            });
        }
    });


    // product_status
    await knex.schema.hasTable("product_status").then(function (exists){
        if(!exists){
            return knex.schema.createTable("product_status",function (t){
                t.increments("id").unsigned().notNullable(); 

                t.integer("product_id").unsigned().nullable();
                t.foreign("product_id").references("id").inTable("products");

                t.integer("login_id").nullable();
                t.timestamps(true,true);                                            
            });
        }
    });


    // product_recom
    await knex.schema.hasTable("product_recom").then(function (exists){
        if(!exists){
            return knex.schema.createTable("product_recom",function (t){
                t.increments("id").unsigned().notNullable(); 

                t.integer("product_id").unsigned().nullable();
                t.foreign("product_id").references("id").inTable("products");

                t.integer("login_id").nullable();
                t.timestamps(true,true);                                            
            });
        }
    });


    // product_cart_recommendeds
    await knex.schema.hasTable("product_cart_recommendeds").then(function (exists){
        if(!exists){
            return knex.schema.createTable("product_cart_recommendeds",function (t){
                t.increments("id").unsigned().notNullable(); 

                t.integer("product_id").unsigned().nullable();
                t.foreign("product_id").references("id").inTable("products");

                t.integer("login_id").nullable();
                t.timestamps(true,true);                                            
            });
        }
    });


    // order_details
    await knex.schema.hasTable("order_details").then(function (exists){
        if(!exists){
            return knex.schema.createTable("order_details",function (t){
                t.increments("id").unsigned().notNullable(); 

                t.integer("order_id").unsigned().nullable();
                t.foreign("order_id").references("id").inTable("orders");

                t.integer("product_id").unsigned().nullable();
                t.foreign("product_id").references("id").inTable("products");

                t.integer("category_id").unsigned().nullable();
                t.foreign("category_id").references("id").inTable("categories");           

                t.string("product_name", 255).nullable();
                t.integer("variation_id").nullable();
                t.string("variation", 255).nullable();
                
                t.integer("product_price").nullable();
                t.integer("quantity").nullable();

                t.integer("eggless").nullable();
                t.integer("eggless_string").nullable();
                t.timestamps(true,true);                                            
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
}