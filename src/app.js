import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import bodyParsercheck from "./middlewares/bodyParser.middleware";

import mainRouter from "./routes/user_main.route";
import superAdminRouter from "./routes/super_admin_main.route";
import branchAdminRouter from "./routes/branch_admin_main.route";

import { createTable } from "./table/create_table";
import { insertData } from "./table/insert_data";

require("dotenv").config();
const path = require("path");

const app = express();
const cors = require("cors");

const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(express.static('public'));
app.use(cors());

dotenv.config();
app.use(async (req, res, next) => {
  res.locals.host_name = req.headers.host

  // res.locals.currentUser = req.user;
  // res.locals.success = req.flash("success");
  // res.locals.error = req.flash("error");
  // const user = await User.find({});
  // const owner = user[0];
  // console.log(owner)
  // res.locals.owner = owner;
  // if(!['/login', '/','/cart','/cart/:id'].includes(req.originalUrl)) {
  //     req.session.previousReturnTo = req.session.returnTo; // store the previous url
  //     req.session.returnTo = req.originalUrl; // assign a new url
  //     // console.log('req.session.previousReturnTo', req.session.previousReturnTo)
  //     // console.log('req.session.returnTo', req.session.returnTo);
  //  }

  next();
});
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


app.get("/", (req, res) => {
  res.json({ message: "ok" });
});


app.get("/home", (req,res)=> {


  res.render('home')
});

app.get("/settings/product_type", (req,res)=> {
  
  res.render('settings/product_type')
});

app.get("/product/product", (req,res)=> {
  res.render('product/product')
});


app.use("/", bodyParsercheck, superAdminRouter);
app.use("/branch", bodyParsercheck, branchAdminRouter);
app.use("/api", bodyParsercheck, mainRouter);

export default app;
