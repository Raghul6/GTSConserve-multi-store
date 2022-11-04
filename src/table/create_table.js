import knex from "../services/db.service";

export const createTable = async (req, res) => {
  try {

    await knex.schema.hasTable("users").then(function (exists) {
  
        if (!exists) {
          return knex.schema.createTable("users", function (t) {
            t.increments("id").primary();
            t.string("name", 100);
            t.string("password", 100);
            t.text("bio");
          });
        }
      });


      await knex.schema.hasTable("users_again").then(function (exists) {
  
        if (!exists) {
          return knex.schema.createTable("users_again", function (t) {
            t.increments("id").primary();
            t.string("name", 100);
            t.string("password", 100);
            t.text("bio");
          });
        }
      });

      return res.status(200).json({status  :true , message : "table successfully created" })

  } catch (error) {
    console.log(error)
    return res.status(500).json({status  :false , message : "Error at creating tables" , error})
  }
};
