"use strict";
const express = require("express");
const app = express();
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const mailer = require("./helpers/nodemailer");
const responseHandler = require("./helpers/response");
const globalErrorHanlder = require("./helpers/globalerrorhandler");
const connectDB = require("./db/dbConnect");
const UserRouter = require("./routes/user");


require("dotenv").config();
let port = process.env.PORT || 4000;
connectDB();
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "20mb" }));

// API DOCS

app.use(cors());
app.use("/api/user", UserRouter);
app.use(globalErrorHanlder);

app
  .listen(port, function () {
    console.log(`🚀 Listening at port ${port}`);
  })
  .on("error", function (error) {
    console.log(error);
  });
