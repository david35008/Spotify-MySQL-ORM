require('dotenv').config();
const mysql = require('mysql');

const DataBase = mysql.createConnection({
    host: "localhost",
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATA_BASE
  });
  
  DataBase.connect((err) => {
    if (err) { console.error(err) }
    else {
      console.log(`Connected to my sql! on ${process.env.DATA_BASE} DataBase`);
    }
  });

module.exports = DataBase;
