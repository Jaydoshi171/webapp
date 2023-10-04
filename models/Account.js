// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../util/config');
const bcrypt = require("bcrypt");

const Account = sequelize.define('Account', {
  id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Account.beforeCreate((account) => {
  if(account.password) {
    account.password = bcrypt.hashSync(account.password, 12);
  }
});

(async () => {
    try {
      await Account.sync({ alter: true });
      console.log('User table synced or altered successfully.');
    } catch (error) {
      console.error('Error syncing or altering User table:', error);
    }
  })();

module.exports = Account;
