const { DataTypes } = require('sequelize');
const sequelize = require('../util/config');

const Assignment = sequelize.define('Assignments', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 100
      }
    },
    num_of_attempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 100
      }
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false
    }
  },{
    // tableName: 'Assignments',
    createdAt:'assignment_created',
    updatedAt: 'assignment_updated',
  });

(async () => {
try {
    await Assignment.sync({ alter: true });
    console.log('User table synced or altered successfully.');
} catch (error) {
    console.error('Error syncing or altering User table:', error);
}
})();

module.exports = Assignment;