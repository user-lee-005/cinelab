const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.json");
const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

const db = {
  sequelize,
  Sequelize,
  TeamMember: require("./TeamMember")(sequelize, DataTypes),
};

module.exports = db;
