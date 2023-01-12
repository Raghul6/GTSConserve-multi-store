// import dbConfig from '../configs/db.config'
// import mySql from 'mysql2'

// const dbConnection = mySql.createConnection(dbConfig)

// dbConnection.connect((err) => {
//   if (!err) {
//     console.log("Connected")
//   }
//   else {
//     console.error(err)
//   }
// })


// export default dbConnection

let knex;
try {
  knex = require("knex")({
    client: "mysql2",
    connection: {
        host :'127.0.0.1',
        port : 3306,
        user : 'root',
        password : 'root',
        database : 'multi_store'

    },
  });
} catch (error) {
  console.log(error, "error at connecting database");
}
console.log("database Connected");

export default knex;