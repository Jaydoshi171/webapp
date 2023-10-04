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
        dialect: process.env.dialect
    }
)

// FOR POSTGRES
// const sequelize = new Sequelize(
//     'cloud_db',
//     'postgres',
//     'Jay@1998',
//     {
//         host: 'localhost',
//         dialect: 'postgres',
//         port: '5434'
//     }
// )

// const sequelize = new Sequelize(`postgres://postgres:Jay@1998@localhost/cloud_db`);


module.exports = sequelize;