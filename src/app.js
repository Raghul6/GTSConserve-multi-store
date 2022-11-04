import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import mainRouter from "./routes/main.route";
import bodyParsercheck from "./middlewares/bodyParser.middleware";

import { createTable } from "./table/create_table";

require("dotenv").config();
const path = require("path");
const fs = require("fs");
const multer = require("multer");

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

// app.use('/uploads', express.static('./uploads'));

dotenv.config();
//app.use(httpLogger)
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.get("/create_table", createTable);

// app.get('/about', (req, res) => {
//   res.sendFile(path.join(__dirname, './static/about_us.html'));
// })

app.use("/api", bodyParsercheck, mainRouter);

// app.use(logErrors)
// app.use(errorHandler)

// function logErrors (err, req, res, next) {
//   next(err)
// }
// function errorHandler (err, req, res, next) {
//   res.status(500).send('Error!')
// }

export default app;
