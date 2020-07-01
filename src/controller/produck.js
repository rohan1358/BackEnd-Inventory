require("dotenv").config();
const miscHelper = require("../helper/helper");
const PModel = require("../model/produck");
module.exports = {
  getProduk: (req, res) => {
    PModel.getProduk()
      .then((result) => {
        miscHelper.response(res, result, 200);
      })
      .catch((err) => console.log(err));
  },
  insertProduct: (req, res) => {
    // console.log(req);
    const {
      nama_product,
      foto_product,
      tgl_register,
      id_kategori,
      jumlah_barang,
      id_produck,
    } = req.body;
    const data1 = {
      nama_product,
      foto_product: req.file
        ? `http://localhost:3000/upload/${req.file.filename}`
        : image,
      tgl_register,
      id_kategori,
    };
    const data2 = {
      jumlah_barang,
    //   id_produck,
    };

    console.log(data1);
    // console.log(req.file.filename);
    // console.log(tgl_register);
    console.log(data1.foto_product);
    PModel.insertProduk(data1, data2)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => console.log(err));
  },
};
