const { Sequelize } = require('sequelize');
const env = require('dotenv');
env.config();

// FOR MYSQL
const sequelize = new Sequelize(
    process.env.database,
    process.env.user,
    process.env.password,
    {
        host: process.env.host,
        dialect: 'mysql'
    }
)

module.exports = sequelize;