require("dotenv").config();
const miscHelper = require("../helper/helper");
const PModel = require("../model/produck");
module.exports = {
  getProduk: (req, res) => {
    PModel.getProduk()
      .then((result) => {
        var newarray = [];
        for (let index = 0; index < result.length; index++) {
          const element = result[index];

          objdata = {
            id_produk: element.id_produk,
            nama_produk: element.nama_produk,
            nama_kategori: element.nama_kategori,
            jumlah_barang: element.jumlah_barang,
          };

          newarray.push(objdata);
        }

        uniqueArray = (a) =>
          [...new Set(a.map((o) => JSON.stringify(o)))].map((s) =>
            JSON.parse(s)
          );
        var uniqdata = uniqueArray(newarray);

        arenewdata = [];
        for (let index = 0; index < uniqdata.length; index++) {
          const mdata = uniqdata[index];

          idproduct = mdata.id_produk;

          arrimage = [];

          for (let index = 0; index < result.length; index++) {
            const imgdata = result[index];

            if (idproduct == imgdata.id_produk) {
              arrimage.push({ image: imgdata.image, id: imgdata.id_image });
            }
          }

          objnewdata = {
            id_produk: idproduct,
            nama_produk: mdata.nama_produk,
            nama_kategori: mdata.nama_kategori,
            jumlah_barang: mdata.jumlah_barang,
            image: arrimage,
          };
          arenewdata.push(objnewdata);
        }

        miscHelper.response(res, arenewdata, 200);
      })
      .catch((err) => console.log(err));
  },
  insertProduct: (req, res) => {
    const { nama_produk, id_kategori, jumlah_barang } = req.body;
    const data1 = {
      nama_produk,
      id_kategori,
    };
    const data2 = {
      jumlah_barang,
    };
    console.log(data1);
    console.log(data2);
    PModel.insertProduk(data1, data2)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => console.log(err));
  },
  insertImage: (req, res) => {
    console.log(req.files);
    req.files.map((img) => {
      const foto = img;
      const data3 = {
        image: img ? `http://localhost:9876/upload/${img.filename}` : image,
      };

      PModel.insertImage(data3)
        .then((result) => {
          res.json(result);
        })
        .catch((err) => console.log(err));
    });
  },
  UProduk: (req, res) => {
    const id_produk = req.params.id_produk;
    const {
      nama_produk,
      foto_produk,
      tgl_register,
      id_kategori,
      jumlah_barang,
      id_produck,
    } = req.body;
    const data1 = {
      nama_produk,
      id_kategori,
    };
    const data2 = {
      jumlah_barang,
    };

    PModel.UProduk(id_produk, data1, data2)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => console.log(err));
  },
  UImage: (req, res) => {
    console.log(req.files);
    console.log("ini adalah request", req.body.id_produk);
    req.files.map((img) => {
      const foto = img;
      const data3 = {
        image: img ? `http://localhost:9876/upload/${img.filename}` : image,
        id_produk: req.body.id_produk,
      };

      PModel.UImage(data3.image, data3.id_produk)
        .then((result) => {
          res.json(result);
        })
        .catch((err) => console.log(err));
    });
  },
  deleteProduk: (req, res) => {
    const id_produk = req.params.id_produk;
    PModel.deleteProduct(id_produk)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => console.log(err));
  },
};
