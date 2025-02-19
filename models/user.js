const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import Sequelize instance

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10000,
    },
}, {
    timestamps: true,
});

module.exports = { User, sequelize };
