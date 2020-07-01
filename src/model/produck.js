require("dotenv").config();

const connection = require("../db/db");
const { resolve } = require("path");
const { reject } = require("async");

module.exports = {
  getProduk: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT tbl_produk.nama_produk, tbl_produk.foto_produk, tbl_produk.tgl_register, tbl_kategori.nama_kategori, tbl_stock.jumlah_barang FROM tbl_kategori INNER JOIN tbl_produk ON tbl_kategori.id_kategori=tbl_produk.id_kategori INNER JOIN tbl_stock ON tbl_produk.id_produk=tbl_stock.id_produk",
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },

  insertProduk: (data1, data2) => {
    return new Promise((resolve, reject) => {
      console.log(data1);
      connection.query(
        "INSERT INTO tbl_produk SET ?",
        data1,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    //   connection.query(
    //     "INSERT INTO tbl_stock SET ?",
    //     [data1.id_produk, data2],
    //     (err, result) => {
    //       if (!err) {
    //         resolve(result);
    //       } else {
    //         reject(new Error(err));
    //       }
    //     }
    //   );
    });
  },
  tracking: (data) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO location SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
};
