require("dotenv").config();

const userModel = require("../model/user");
const jwt = require("jsonwebtoken");
const miscHelper = require("../helper/helper");
const validUrl = require("valid-url");
const shortId = require("shortid");
const config = require("shortid");
const bodyParser = require("body-parser");
module.exports = {
  getUser: (req, res) => {
    userModel
      .getUser()
      .then((result) => {
        miscHelper.response(res, result, 200);
      })
      .catch((err) => console.log(err));
  },
  insertUser: (req, res) => {
    const { nama_user } = req.body;

    const data = {
      nama_user,
    };
    userModel
      .insertUser(data)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => console.log(err));
  },
  tracking: (req, res) => {
    //   const {longUrl} = req.body
    //   const baseUrl = config.get('baseUrl')
    //   if(!validUrl.isUri(baseUrl)){
    //       return res.status(401).json("invalid url")
    //   }

    //   const urlCode =shortId.generate();

    //   if(validUrl.isUri(longUrl)){
    //       try{
    //           let url = await
    //       }catch(err){

    //       }
    //   }

    navigator.geolocation.getCurrentPosition();
    const { latitude, longitude, id_user } = req.body;
    const data = {
      latitude,
      longitude,
      id_user,
    };
    userModel.tracking(data).then((resullt) => {
      res.json(resullt).catch((err) => {
        console.log(err);
      });
    });
  },
  loginUser: (req, res) => {
    const name = req.body.nama_user;
    console.log(name);
    // console.log('bisa')
    userModel
      .loginUser(name)
      .then((result) => {
        console.log(result.length);
        // res.json(result);
        if (result.length !== 0) {
          var token = jwt.sign({ name: name }, process.env.PRIVATE_KEY);
          console.log(token);
          res.json({
            token: token,
          });
        } else {
          res.json({
            message: "user tidak ditemukan",
          });
        }
      })
      .catch((err) => console.log(err));
  },
};
