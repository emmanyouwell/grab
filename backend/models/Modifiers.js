import { DataTypes } from 'sequelize';
import { getSequelizeInstance } from '../config/database/SequelizeInstance.js';

const sequelize = getSequelizeInstance({ database: 'grab' });

const Modifiers = sequelize.define('Modifiers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    orderline_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    mod_id: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    tax: DataTypes.INTEGER,
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },

}, {
    tableName: 'modifiers',
    timestamps: true,
    underscored: true,
    paranoid: true, // Optional if you're using soft deletes
});

export default Modifiers;
