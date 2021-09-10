
const express = require("express");
const pool = require("../dbConn");
const runQuery = require('../dbConn');
const { encryptPassword } = require('../bcryptUtils');

const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    const bcryptPassword = encryptPassword(password);
    const query = `insert into users (name, email, password) values('${name}','${email}', '${bcryptPassword}')` 
    runQuery(query).then(result => {
        const output = { ...result.rows[0]};
        res.status(201).json({
            status:201,
            data: output,
            error : null
        })
    }).catch((err) => {
        console.log(err.message)
        res.status(500).json({
            status:500,
            error: {
              err,
            },
            data: null,
          });
    })
}



module.exports = {registerUser};