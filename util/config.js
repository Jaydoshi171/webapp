const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'healthCheck',
    'root',
    'Jay@1998',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

module.exports = sequelize;