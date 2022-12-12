let knex;
try {
  knex = require("knex")({
    client: "mysql2",
    connection: {
        host : '127.0.0.1',
        port : 3306,
        user : 'root',
        password : 'root',
        database : 'maram'
    },
  });
} catch (error) {
  console.log(error, "error at connecting database");
}
console.log("database Connected");



// async function hl() {
//   await knex.schema.hasTable("users").then(function (exists) {
//     if (!exists) {
//       return knex.schema.createTable("users", function (t) {
//         t.increments("id").primary();
//         t.string("name", 100);
//         t.string("password", 100);
//         t.text("bio");
//       });
//     }
//   });
// }
// hl();
// console.log(knex)
export default knex;



// var mysql = require('mysql2');
<<<<<<< HEAD
=======

>>>>>>> 0f8e5570efa619c7804c2ef2f8f49dd3ebe70687

// var connection = mysql.createConnection({
//   host     : process.env.DB_HOST,
//   user     : process.env.DB_USER,
//   // password : process.env.DB_PASSWORD,
//   port     : process.env.DB_PORT
// });

<<<<<<< HEAD
// connection.connect(function(err) {
//   if (err) {
//     console.error('Database connection failed: ' + err.stack);
//     return;
//   }
=======
var connection = mysql.createConnection({
  host     : 'awseb-e-x3s3f4wi2v-stack-awsebrdsdatabase-x1jmeljtlon9.cnxyneaiybt8.ap-south-1.rds.amazonaws.com',
  user     : 'maramdbadmin',
  password : 'q&HJIJ^EWF7N4sBs',
  port     : 3306
});
>>>>>>> 0f8e5570efa619c7804c2ef2f8f49dd3ebe70687

//   console.log('Connected to database.');
// });

<<<<<<< HEAD
=======

// connection.connect(function(err) {
//   if (err) {
//     console.error('Database connection failed: ' + err.stack);
//     return;
//   }

//   console.log('Connected to database.');
// });

>>>>>>> 0f8e5570efa619c7804c2ef2f8f49dd3ebe70687
// connection.end();