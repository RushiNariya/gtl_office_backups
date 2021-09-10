const express = require("express");
const pool = require("../dbConn");
const runQuery = require("../dbConn");
const { comparePassword } = require("../bcryptUtils");
const { generateToken } = require("../jwtUtils");

let user = {
  id: null,
  email: null,
  token: null,
};

const login = (req, res) => {
  const { email, password } = req.body;
  const query = `select * from users where email = '${email}'`;
  runQuery(query)
    .then((result) => {
      if (
        result.rowCount === 1 &&
        comparePassword(password, result.rows[0].password)
      ) {
        user.id = result.rows[0].id;
        user.email = result.rows[0].email;
        user.password = password;
        user.token = generateToken(user);
        res.status(201).json({
            status:201,
            data: {...user},
            error : null
        })
      }
    })
    .catch((err) => {
        console.log(err.message)
        res.status(404).json({
            status:404,
            error: {
              err,
            },
            data: null,
          });
    });
};

module.exports = {login};
