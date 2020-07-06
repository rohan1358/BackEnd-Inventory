const express = require("express");
const Route = express.Router();
const KKontroller = require("../controller/kategori");

Route.get("/kategori", KKontroller.getKategori).post("/insert", KKontroller.insertKategori).patch('/update/:id_kategori', KKontroller.updateKategori)
module.exports = Route;
