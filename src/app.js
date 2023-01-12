import express from 'express';
import bodyParser from 'body-parser';
import mainRouter from './routes/main.route'
import bodyParsercheck from './middlewares/bodyParser.middleware'
import * as dotenv from "dotenv"
import httpLogger from './logger/httpLogger';
import logger from "./logger/logger"
import { createTable } from './table/create_table';
import { insertData } from "./table/insert_data";
import flash from "connect-flash";
import session from "express-session";
import { authenticateJWT } from './middlewares/authToken.middleware';
import knex from "./services/db.service";

const app = express()

dotenv.config()
app.use(httpLogger)
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})
app.use('/api', bodyParsercheck, mainRouter)
app.get("/home", authenticateJWT, (req, res) => {
  const {is_super_admin} = req.body
  const {is_user_added} = req.query
  
  
  
    if(!is_super_admin && is_user_added == 1){
      req.flash("error","User Already Found")
      return res.render("super_admin/home/home");
    }
    if(!is_super_admin && is_user_added == 2){
      req.flash("success","User Created SuccessFully")
      return res.render("super_admin/home/home");
    }
  
    if(is_super_admin && is_user_added == 1){
      req.flash("error","User Already Found")
      return res.render("super_admin/home/home");
    }
    if(is_super_admin && is_user_added == 2){
      req.flash("success","User Created SuccessFully")
      return res.render("super_admin/home/home");
    }
  
  
  
    if(is_super_admin){
  
      res.render("super_admin/home/home");
    }else{
  
      res.render("branch_admin/home/home");
    }
  });




// app.use(logErrors)
// app.use(errorHandler)

// function logErrors (err, req, res, next) {
//   next(err)
// }
// function errorHandler (err, req, res, next) {
//   res.status(500).send('Error!')
// }
app.get("/insert_data", insertData);
app.get("/create_table", createTable);
app.use((err,req,res,next)=>{
  // because err.status is undefined 
   res.status(400).json({
       error : {
           message : err.message
      }
   });
})

export default app;