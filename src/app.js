import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import bodyParsercheck from "./middlewares/bodyParser.middleware";

import flash from "connect-flash";
import { authenticateJWTSession } from "./middlewares/authToken.middleware";
import mainRouter from "./routes/user_main.route";
import superAdminRouter from "./routes/super_admin_main.route";
import branchAdminRouter from "./routes/branch_admin_main.route";

import { createTable } from "./table/create_table";
import { insertData } from "./table/insert_data";
import session from "express-session";

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

app.use(flash());

app.use(express.static("public"));
// app.use(express.static(__dirname +  "/public"));

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const secret = "thisissecret";

//https://github.com/nlf/connect-mysql
// for future we need to store the session in mysql to keep the sessions data

const sessionConfig = {
  name: "token",
  // secure:true,
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    HttpOnly: true, // this is default was true
    // secure:true, // note we only can give this on deployment mode not in localhost . if we give in localhost it will break things, eg: we can't login
    expires: new Date().setDate(new Date().getDate() + 1),
    maxAge: new Date().setDate(new Date().getDate() + 1),
    // expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    // maxAge: 1000 * 60 * 60 * 24 * 7,
    //    miliseconds * seconds * minutes * hours * days = 1 week in miliseconds
  },
};

app.use(session(sessionConfig));
dotenv.config();

app.use(async (req, res, next) => {
  res.locals.host_name = req.headers.host;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");

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

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.get("/home", authenticateJWTSession, (req, res) => {
  res.render("home");
});

app.use("/super_admin", bodyParsercheck, superAdminRouter);
app.use("/branch_admin", bodyParsercheck, branchAdminRouter);
app.use("/api", bodyParsercheck, mainRouter);

export default app;
