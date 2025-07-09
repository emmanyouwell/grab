// Sequelize migration for "orders" table
export const up_orders = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('orders', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    order_id: Sequelize.TEXT,
    short_order_number: Sequelize.TEXT,
    merchant_id: Sequelize.TEXT,
    partner_merchant_id: Sequelize.TEXT,
    payment_type: Sequelize.TEXT,
    cutlery: Sequelize.TINYINT,
    order_time: Sequelize.DATE,
    schedule_time: Sequelize.DATE,
    currency_code: Sequelize.TEXT,
    currency_symbol: Sequelize.TEXT,
    currency_exponent: Sequelize.TEXT,
    order_accepted_type: Sequelize.TEXT,
    order_type: Sequelize.TEXT,
    is_mex_edit_order: Sequelize.TINYINT,
    subtotal: Sequelize.INTEGER,
    tax: Sequelize.INTEGER,
    merchant_charge_fee: Sequelize.INTEGER,
    grab_fund_promo: Sequelize.INTEGER,
    merchant_fund_promo: Sequelize.INTEGER,
    basket_promo: Sequelize.INTEGER,
    delivery_fee: Sequelize.INTEGER,
    small_order_fee: Sequelize.INTEGER,
    eater_payment: Sequelize.INTEGER,
    total: Sequelize.INTEGER,
    table_id: Sequelize.TEXT,
    eater_count: Sequelize.INTEGER,
    receiver: Sequelize.JSON,
    allow_change: Sequelize.TINYINT,
    estimate_order_ready_time: Sequelize.DATE,
    max_order_ready_time: Sequelize.DATE,
    new_order_ready_time: Sequelize.DATE,
    membership_id: Sequelize.TEXT,
    raw_payload: Sequelize.JSON,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    deleted_at: Sequelize.DATE
  });
};

export const down_orders = async (queryInterface) => {
  await queryInterface.dropTable('orders');
};

// Sequelize migration for "campaigns" table
export const up_campaigns = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('campaigns', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    order_id: { type: Sequelize.INTEGER, allowNull: false },
    campaign_id: Sequelize.TEXT,
    name: Sequelize.TEXT,
    campaign_name_for_mex: Sequelize.TEXT,
    level: Sequelize.TEXT,
    type: Sequelize.TEXT,
    usage_count: Sequelize.TEXT,
    mex_funded_ratio: Sequelize.TEXT,
    deducted_amount: Sequelize.TEXT,
    deducted_part: Sequelize.TEXT,
    applied_item_ids: Sequelize.JSON,
    free_item_id: Sequelize.TEXT,
    free_item_name: Sequelize.TEXT,
    free_item_quantity: Sequelize.TEXT,
    free_item_price: Sequelize.TEXT,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    deleted_at: Sequelize.DATE
  });
  await queryInterface.addConstraint('campaigns', {
    fields: ['order_id'],
    type: 'foreign key',
    name: 'fk_campaigns_orders1',
    references: { table: 'orders', field: 'id' },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  });
};

export const down_campaigns = async (queryInterface) => {
  await queryInterface.dropTable('campaigns');
};

// Sequelize migration for "orderline" table
export const up_orderline = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('orderline', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    order_id: { type: Sequelize.INTEGER, allowNull: false },
    item_id: Sequelize.TEXT,
    grab_item_id: Sequelize.TEXT,
    quantity: Sequelize.INTEGER,
    price: Sequelize.INTEGER,
    tax: Sequelize.INTEGER,
    specifications: Sequelize.TEXT,
    out_of_stock_instruction: Sequelize.JSON,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    deleted_at: Sequelize.DATE
  });
  await queryInterface.addConstraint('orderline', {
    fields: ['order_id'],
    type: 'foreign key',
    name: 'fk_items_orders',
    references: { table: 'orders', field: 'id' },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  });
};

export const down_orderline = async (queryInterface) => {
  await queryInterface.dropTable('orderline');
};

// Sequelize migration for "modifiers" table
export const up_modifiers = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('modifiers', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    orderline_id: { type: Sequelize.INTEGER, allowNull: false },
    mod_id: Sequelize.TEXT,
    price: Sequelize.INTEGER,
    tax: Sequelize.INTEGER,
    quantity: { type: Sequelize.INTEGER, defaultValue: 1 },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    deleted_at: Sequelize.DATE
  });
  await queryInterface.addConstraint('modifiers', {
    fields: ['orderline_id'],
    type: 'foreign key',
    name: 'fk_modifiers_orderline1',
    references: { table: 'orderline', field: 'id' },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  });
};

export const down_modifiers = async (queryInterface) => {
  await queryInterface.dropTable('modifiers');
};

// Sequelize migration for "promos" table
export const up_promos = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('promos', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    order_id: { type: Sequelize.INTEGER, allowNull: false },
    code: Sequelize.TEXT,
    description: Sequelize.TEXT,
    name: Sequelize.TEXT,
    promo_amount: Sequelize.INTEGER,
    mex_funded_ratio: Sequelize.INTEGER,
    mex_funded_amount: Sequelize.INTEGER,
    targeted_price: Sequelize.INTEGER,
    promo_amount_in_min: Sequelize.INTEGER,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    deleted_at: Sequelize.DATE
  });
  await queryInterface.addConstraint('promos', {
    fields: ['order_id'],
    type: 'foreign key',
    name: 'fk_promos_orders1',
    references: { table: 'orders', field: 'id' },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  });
};

export const down_promos = async (queryInterface) => {
  await queryInterface.dropTable('promos');
};
