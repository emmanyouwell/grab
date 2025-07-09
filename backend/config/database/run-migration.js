import { Sequelize } from 'sequelize';
import config from '../config.js';

// Import only the functions for the intended schema
import {
    up_orders,
    up_campaigns,
    up_orderline,
    up_modifiers,
    up_promos
} from '../../schema/grab.js';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false,
});

const queryInterface = sequelize.getQueryInterface();

async function migrate() {
    try {
        await sequelize.authenticate();
        // Run selected migrations
        await up_orders(queryInterface, Sequelize); // Orders Table
        await up_campaigns(queryInterface, Sequelize); // Campaigns Table
        await up_orderline(queryInterface, Sequelize); // Orderline Table
        await up_modifiers(queryInterface, Sequelize); // Modifiers Table
        await up_promos(queryInterface, Sequelize); // Promos Table

        console.log('Migration completed successfully.');

    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await sequelize.close();
    }
}

// Run the migration function
migrate();
