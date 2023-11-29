const { DataTypes } = require('sequelize');
const sequelize = require('../util/config');

const Submission = sequelize.define('Submission', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    assignment_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    submission_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    account_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
  },{
    createdAt:'submission_date',
    updatedAt: 'assignment_updated',
  });

(async () => {
try {
    await Submission.sync({ alter: true });
    console.log('Submission table synced or altered successfully.');
} catch (error) {
    console.error('Error syncing or altering Submission table:', error);
}
})();

module.exports = Submission;