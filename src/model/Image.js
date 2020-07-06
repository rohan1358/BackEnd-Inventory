require("dotenv").config();

const connection = require("../db/db");
const { resolve } = require("path");
const { reject } = require("async");

module.exports = {
  insertProduk: (data1) => {
    return new Promise((resolve, reject) => {
      console.log(data1);
      connection.query("INSERT INTO tbl_image SET ?", data1, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  getImage: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT tbl_image.image, tbl_image.id_produk FROM tbl_image INNER JOIN tbl_produk ON tbl_produk.id_produk=tbl_image.id_produk",
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
  deleteGambar: (id_gambar) => {
    const id = [id_gambar]
    console.log(id)
    return new Promise((resolve, reject) => {
      id.forEach((id) => {
        connection.query(
          "DELETE FROM `tbl_image` WHERE id_image = ?",
          id.id_produk,
          (err, result) => {
            if (!err) {
              resolve(result);
            } else {
              reject(new Error(err));
            }
          }
        );
      });
    });
  },
};
