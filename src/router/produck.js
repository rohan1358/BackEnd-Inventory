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
Router.get("/list", PController.getProduk)
  .post("/insert", upload.single("image"), PController.insertProduct)
  .post("/insert/image", upload.array("image", 12), PController.insertImage)
  .patch("/update/:id_produk", PController.UProduk)
  .delete("/delete/:id_produk", PController.deleteProduk)
  .patch(
    "/update/image/:id_produk",
    upload.array("image", 12),
    PController.UImage
  );

module.exports = Router;
