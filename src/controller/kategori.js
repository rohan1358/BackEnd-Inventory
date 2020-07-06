require("dotenv").config();
const miscHelper = require("../helper/helper");
const KKategori = require("../model/kategori");
module.exports = {
  getKategori: (req, res) => {
    KKategori.getKategori()
      .then((result) => {
        miscHelper.response(res, result, 200);
      })
      .catch((err) => console.log(err));
  },
  insertKategori: (req, res) => {
    const { nama_kategori } = req.body;
    const data = {
      nama_kategori,
    };
    console.log(req);
    KKategori.insertKategori(data)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => console.log(err));
  },
  updateKategori: (req, res) => {
    // console.log(req.params.id_kategori);
    const id = req.params.id_kategori;
    const { nama_kategori } = req.body;
    const data = nama_kategori;
    KKategori.UKategori(id, data)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => console.log(err));
  },
};
