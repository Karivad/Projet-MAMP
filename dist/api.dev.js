"use strict";

var express = require("express");

var app = express();
var port = 3000;

var mysql = require('mysql2');

var bcrypt = require('bcrypt');

var _require = require("assert"),
    ok = _require.ok;

var saltRounds = 10;
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Khmer200487?',
  database: 'autdb'
});
con.connect(function (err) {
  if (err) throw err;
  app.post("/sign-up", function (req, res) {
    try {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          var dataUser = "INSERT INTO users (name, email, password) VALUES ('".concat(req.body.name, "', '").concat(req.body.email, "', '").concat(hash, "');");
          con.query(dataUser, function () {
            console.log(hash);
            res.json("👌🏾");
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  });
  app.post("/sign-in", function (req, res) {
    try {
      con.query("SELECT * FROM users WHERE email = '".concat(req.body.email, "'"), function (err, result) {
        // if(err) throw err;
        // if(req.body.password === result[0].password)
        // console.log('u re connected 👍🏾')
        // else
        // console.log('sorry we dunno know this user 🙈')
        // res.send(result);
        var hash = result[0].password;
        bcrypt.compare(req.body.password, hash, function (err, resultat) {
          if (err) {
            console.log('error');
          } else {
            if (resultat == true) {
              res.send('ok');
              console.log('ok logged in');
            } else {
              resultat == false;
              res.send('not connected');
              console.log('not connected');
            }
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  });
  console.log('touchdown 🥇');
});
app.listen(port, function () {
  console.log('connected');
});