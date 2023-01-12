// import knex from "knex"

// const queryBuilder = knex({
//   client: "mysql",
// })

let  knex = require('knex')({
  client: 'mysql2',
  connection: {
    host : '127.0.0.1',
    port : 3306,
    user : 'root',
    password : 'root',
    database : 'multi_store'
  },
})

// async function hl(){
//   let result = await knex ('users').select ('*').where('id', 1)
//   console.log (result)
// }

// hl()
console.log("Connected")

export default knex