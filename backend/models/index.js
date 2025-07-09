import Orders from './Orders.js';
import Campaigns from './Campaigns.js';
import Orderline from './Orderline.js';
import Modifiers from './Modifiers.js';
import Promos from './Promos.js';

Orders.hasMany(Campaigns, { foreignKey: 'order_id' });
Campaigns.belongsTo(Orders, { foreignKey: 'order_id' });

Orders.hasMany(Orderline, { foreignKey: 'order_id' });
Orderline.belongsTo(Orders, { foreignKey: 'order_id' });

Orderline.hasMany(Modifiers, { foreignKey: 'orderline_id' });
Modifiers.belongsTo(Orderline, { foreignKey: 'orderline_id' });

Orders.hasMany(Promos, { foreignKey: 'order_id' });
Promos.belongsTo(Orders, { foreignKey: 'order_id' });

export default {
  Orders,
  Campaigns,
  Orderline,
  Modifiers,
  Promos,
};
