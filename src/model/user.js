require("dotenv").config();

const connection = require("../db/db");

module.exports = {
  loginUser: (name) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM tbl_user WHERE nama_user=?",
        [name],
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
  getUser: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT person.username, location.ltitude, location.longitude FROM `person` INNER JOIN location ON person.id=location.id_user",
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

  insertUser: (data) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO tbl_user SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
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
