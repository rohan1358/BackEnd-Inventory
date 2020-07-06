require("dotenv").config();

const connection = require("../db/db");
const { resolve } = require("path");
const { reject } = require("async");
const image = require("./image");
const mysql = require("mysql");
module.exports = {
  getProduk: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT tbl_produk.id_produk, tbl_image.id_image, tbl_produk.nama_produk, tbl_produk.tgl_register, tbl_kategori.nama_kategori, tbl_stock.jumlah_barang, tbl_image.image  FROM tbl_kategori INNER JOIN tbl_produk ON tbl_kategori.id_kategori=tbl_produk.id_kategori INNER JOIN tbl_stock ON tbl_produk.id_produk=tbl_stock.id_produk INNER JOIN tbl_image ON tbl_produk.id_produk=tbl_image.id_produk",
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
  insertImage: (data3) => {
    console.log("ini adalah jumlah gambar", data3);
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT MAX(id_produk) AS id_produk FROM tbl_produk",
        (err, result) => {
          if (!err) {
            connection.query(
              `INSERT INTO tbl_image (image, id_produk) VALUES (?,?)`,
              [data3.image, result[0].id_produk],
              (err, result) => {
                if (!err) {
                  resolve(result);
                } else {
                  reject(new Error(err));
                }
              }
            );
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  insertProduk: (data1, data2) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO tbl_produk SET ?", data1, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
      connection.query(
        "SELECT MAX(id_produk) AS id_produk FROM tbl_produk",
        (err, result) => {
          if (!err) {
            connection.query(
              `INSERT INTO tbl_stock ( id_produk, jumlah_barang) VALUES (${result[0].id_produk},${data2.jumlah_barang})`,
              data2,
              (err, result) => {
                if (!err) {
                  resolve(result);
                } else {
                  reject(new Error(err));
                }
              }
            );
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  UProduk: (id_produk, data1, data2) => {
    console.log(id_produk, data1, data2);
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE tbl_produk SET ? WHERE id_produk = ?",
        [data1, id_produk],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
      connection.query(
        "UPDATE tbl_stock SET ? WHERE id_produk = ?",
        [data2, id_produk],
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
  UImage: (image, id_produk) => {
    console.log(id_produk);
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO tbl_image SET ?",
        [image, id_produk],
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
  deleteProduct: (id_produk) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM tbl_produk WHERE id_produk=?",
        id_produk,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
      connection.query(
        "DELETE FROM tbl_stock WHERE id_produk=?",
        id_produk,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
      connection.query(
        "DELETE FROM tbl_image WHERE id_produk=?",
        id_produk,
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
};
