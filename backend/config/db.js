const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('todo_db', 'root', 'Rg@040204', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
