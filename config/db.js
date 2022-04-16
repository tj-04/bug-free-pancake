/* eslint-disable no-unused-vars */
'use strict';
const dotenv = require('dotenv').config();

const config = {
  port: process.env.PORT,
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    connection_string: process.env.DB_CONNECTION_STRING,
    security: process.env.DB_SECURITY,
  },
};

module.exports = config;
