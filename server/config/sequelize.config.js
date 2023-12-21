const { Sequelize } = require('sequelize');
//... schema nae ideas, your user, your password
const sequelize = new Sequelize('ideas', 'root', 'imcnabb1234', {
host: 'localhost',
dialect: 'mysql',
port: process.env.MYSQL_PORT,
});

module.exports = sequelize;
