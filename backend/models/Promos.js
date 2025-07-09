import { DataTypes } from 'sequelize';
import { getSequelizeInstance } from '../config/database/SequelizeInstance.js';

const sequelize = getSequelizeInstance({ database: 'grab' });

const Promos = sequelize.define('Promos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    code: DataTypes.TEXT,
    description: DataTypes.TEXT,
    name: DataTypes.TEXT,
    promo_amount: DataTypes.INTEGER,
    mex_funded_ratio: DataTypes.INTEGER,
    mex_funded_amount: DataTypes.INTEGER,
    targeted_price: DataTypes.INTEGER,
    promo_amount_in_min: DataTypes.INTEGER,

}, {
    tableName: 'promos',
    timestamps: true,
    underscored: true,
    paranoid: true, // Optional for soft delete
});

export default Promos;
