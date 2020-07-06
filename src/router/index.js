const express = require("express");
const user = require("./user");
const Router = express.Router();
const produck = require("./produck");
const kategori = require("./kategori");
const image = require('./image')

Router.use("/user", user);
Router.use("/produk", produck);
Router.use("/kategori", kategori);
Router.use("/image", image);

Router.use;
module.exports = Router;
