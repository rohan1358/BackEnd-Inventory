require("dotenv").config();
const connection = require("../db/db");

module.exports = {
  getKategori: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT id_kategori AS value, nama_kategori AS text FROM `tbl_kategori`",
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
  insertKategori: (data) => {
    console.log(data);
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO tbl_kategori SET ?",
        data,
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
  UKategori: (id, data) => {
    console.log(data);
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE tbl_kategori SET nama_kategori = ? WHERE id_kategori = ${id}`,
        data,
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
