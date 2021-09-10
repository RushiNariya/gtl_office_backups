const express = require("express");
const pool = require("../dbConn");
const runQuery = require('../dbConn');
const { encryptPassword } = require('../bcryptUtils');

const getUsers = async (req, res) => {
    const query = `select * from users`; 
    runQuery(query).then(result => {
        console.log("------------------")
        console.log(result)
        res.status(200).json({
            status:200,
            data: result.rows,
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

module.exports = {getUsers};