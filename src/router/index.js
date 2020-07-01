const express = require("express");
const user = require("./user");
const Router = express.Router();
const produck = require('./produck')

Router.use("/user", user);
Router.use("/produk", produck)
Router.use;
module.exports = Router;
