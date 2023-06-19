"use strict";
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const Users=require('./users-model')
const POSTGRES_URI = process.env.DATABASE_URL;

let sequelize = new Sequelize(POSTGRES_URI, {});

module.exports = {
  db: sequelize,
  Users: Users(sequelize, DataTypes),
};
