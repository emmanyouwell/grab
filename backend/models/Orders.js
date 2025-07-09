import { DataTypes } from 'sequelize';
import { getSequelizeInstance } from '../config/database/SequelizeInstance.js';

const sequelize = getSequelizeInstance({ database: 'grab' });

const Orders = sequelize.define('Orders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    order_id: DataTypes.TEXT,
    short_order_number: DataTypes.TEXT,
    merchant_id: DataTypes.TEXT,
    partner_merchant_id: DataTypes.TEXT,
    payment_type: DataTypes.TEXT,
    cutlery: DataTypes.TINYINT,
    order_time: DataTypes.DATE,
    schedule_time: DataTypes.DATE,
    currency_code: DataTypes.TEXT,
    currency_symbol: DataTypes.TEXT,
    currency_exponent: DataTypes.TEXT,
    order_accepted_type: DataTypes.TEXT,
    order_type: DataTypes.TEXT,
    is_mex_edit_order: DataTypes.TINYINT,
    subtotal: DataTypes.INTEGER,
    tax: DataTypes.INTEGER,
    merchant_charge_fee: DataTypes.INTEGER,
    grab_fund_promo: DataTypes.INTEGER,
    merchant_fund_promo: DataTypes.INTEGER,
    basket_promo: DataTypes.INTEGER,
    delivery_fee: DataTypes.INTEGER,
    small_order_fee: DataTypes.INTEGER,
    eater_payment: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    table_id: DataTypes.TEXT,
    eater_count: DataTypes.INTEGER,
    receiver: DataTypes.JSON,
    allow_change: DataTypes.TINYINT,
    estimate_order_ready_time: DataTypes.DATE,
    max_order_ready_time: DataTypes.DATE,
    new_order_ready_time: DataTypes.DATE,
    membership_id: DataTypes.TEXT,
    raw_payload: DataTypes.JSON,

}, {
    tableName: 'orders',
    timestamps: true,
    underscored: true,
    paranoid: true, // Optional: soft delete support
});

export default Orders;
