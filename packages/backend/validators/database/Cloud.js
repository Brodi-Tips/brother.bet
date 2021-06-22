const Sequelize = require('sequelize');
const pg = require('pg');
const config = require('./config/database');

pg.types.setTypeParser(1082, 'text', (text) => text);
pg.types.setTypeParser(1184, 'text', (text) => text);
pg.types.setTypeParser(1114, 'text', (text) => text);

const db = {};

const sequelize = new Sequelize({
  database: config.development.database,
  username: config.development.username,
  password: config.development.password,
  host: config.development.config.host,
  port: config.development.config.port,
  dialect: config.development.config.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
// const sequelize = new Sequelize({
//   database: config.development.database,
//   username: config.development.username,
//   password: config.development.password,
//   host: config.development.config.host,
//   port: config.development.config.port,
//   dialect: config.development.config.dialect,
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
