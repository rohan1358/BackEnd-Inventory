const express = require("express");
const Router = express.Router();
const PController = require("../controller/produck");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
Router.get("/list", PController.getProduk).post(
  "/insert",
  upload.single("foto_product"),
  PController.insertProduct
);
module.exports = Router;
