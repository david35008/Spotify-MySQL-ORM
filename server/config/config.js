
require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DEV,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "logging": false,
    "dialect": "mysql",
    "define": { "underscored": true }
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.TEST_DB,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "define": { "underscored": true }
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.PRODUCTION_DB,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "define": { "underscored": true }
  }
}
