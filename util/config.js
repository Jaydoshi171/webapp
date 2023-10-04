const { Sequelize } = require('sequelize');

// FOR MYSQL
const sequelize = new Sequelize(
    'healthCheck',
    'root',
    'Jay@1998',
    {
        host: 'localhost',
        dialect: 'mysql'
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