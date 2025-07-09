import { DataTypes } from 'sequelize';
import { getSequelizeInstance } from '../config/database/SequelizeInstance.js';

const sequelize = getSequelizeInstance({ database: 'grab' });

const Orderline = sequelize.define('Orderline', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    item_id: DataTypes.TEXT,
    grab_item_id: DataTypes.TEXT,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    tax: DataTypes.INTEGER,
    specifications: DataTypes.TEXT,
    out_of_stock_instruction: DataTypes.JSON,

}, {
    tableName: 'orderline',
    timestamps: true,
    underscored: true,
    paranoid: true, // Optional, if you're using soft deletes across the app
});

export default Orderline;
