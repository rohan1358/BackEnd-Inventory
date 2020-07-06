require("dotenv").config();
const miscHelper = require("../helper/helper");
const IModel = require("../model/image");
const image = require("../model/image");
const { response } = require("../helper/helper");
module.exports = {
  insertImage: (req, res) => {
    req.files.map((img) => {
      console.log(img);
      console.log(img.filename);
      const data1 = {
        image: img ? `http://localhost:9876/upload/${img.filename}` : image,
      };

      IModel.insertProduk(data1)
        .then((result) => {
          res.json(result);
        })
        .catch((err) => console.log(err));
    });
  },
  getImage: (req, res) => {
    IModel.getImage()
      .then((result) => {
        console.log(result);
        miscHelper.response(res, result, 200);
      })
      .catch((err) => console.log(err));
  },
  deleteGambar: (req, res) => {
    const id_gambar = req.params;
    // console.log(id_gambar)
    IModel.deleteGambar(id_gambar)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => console.log(err));
  },
};
