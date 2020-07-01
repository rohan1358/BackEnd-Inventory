const express = require("express");
const Router = express.Router();
const userController = require("../controller/user");
const unirest = require("unirest");
var geolocation = require("geolocation");

Router.post("/insert", userController.insertUser)
  .post("/login", userController.loginUser)
  .get("/list", userController.getUser)
  .post("/tracking", userController.tracking)
  .get("/", (req, res) => {
    geolocation.getCurrentPosition(function (err, position) {
      if (err) throw err;
      console.log(position);
      res.send(position);
    });
  });

module.exports = Router;
