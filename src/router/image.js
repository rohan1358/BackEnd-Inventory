const express = require("express");
const Router = express.Router();
const IController = require("../controller/image");
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
Router.post("/insert", upload.array("image",12), IController.insertImage).get('/', IController.getImage).delete('/delete/:id_produk', IController.deleteGambar)
module.exports = Router;
