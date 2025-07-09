import { DataTypes } from 'sequelize';
import { getSequelizeInstance } from '../config/database/SequelizeInstance.js';

const sequelize = getSequelizeInstance({ database: 'grab' });

const Campaigns = sequelize.define('Campaigns', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  campaign_id: DataTypes.TEXT,
  name: DataTypes.TEXT,
  campaign_name_for_mex: DataTypes.TEXT,
  level: DataTypes.TEXT,
  type: DataTypes.TEXT,
  usage_count: DataTypes.TEXT,
  mex_funded_ratio: DataTypes.TEXT,
  deducted_amount: DataTypes.TEXT,
  deducted_part: DataTypes.TEXT,
  applied_item_ids: DataTypes.JSON,
  free_item_id: DataTypes.TEXT,
  free_item_name: DataTypes.TEXT,
  free_item_quantity: DataTypes.TEXT,
  free_item_price: DataTypes.TEXT,
  
}, {
  tableName: 'campaigns',
  timestamps: true,
  underscored: true,
  paranoid: true, // Optional if soft deletes are used elsewhere
});

export default Campaigns;
