import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import bodyParsercheck from "./middlewares/bodyParser.middleware";

import mainRouter from "./routes/user_main.route";
import superAdminRouter from "./routes/super_admin_main.route";
import branchAdminRouter from "./routes/branch_admin_main.route";

import { createTable } from "./table/create_table";

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
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

dotenv.config();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

// for create tables
app.get("/create_table", createTable);

app.use("/", bodyParsercheck, superAdminRouter);
app.use("/branch", bodyParsercheck, branchAdminRouter);
app.use("/api", bodyParsercheck, mainRouter);

export default app;
