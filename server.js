"use strict";
require("rootpath")();
const express = require("express");
const app = express();
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const mailer = require("./helpers/nodemailer");
const responseHandler = require("./helpers/response");
require("dotenv").config();
let port = process.env.PORT || 4000;

app.use(helmet());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "20mb" }));

// API DOCS

app.use(cors());

app.post("/api/contact-us", async (req, res) => {
  try {
    console.log(req.body, "resssss");
    const res1 = await mailer.sendmail(
      req,
      res,
      req.body.query_email,
      req.body.requirement,
      req.body.description
    );
    responseHandler.success(res, "Email Sent", 200);
  } catch (e) {
    responseHandler.failure(res, e, 400);
  }
});

app
  .listen(port, function () {
    console.log(`🚀 Listening at port ${port}`);
  })
  .on("error", function (error) {
    console.log(error);
  });
