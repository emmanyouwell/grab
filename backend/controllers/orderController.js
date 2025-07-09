
import Orders from '../models/Orders.js';
import Orderline from '../models/Orderline.js';
import Modifiers from '../models/Modifiers.js';
import Campaigns from '../models/Campaigns.js';
import Promos from '../models/Promos.js';

import { getSequelizeInstance } from '../config/database/SequelizeInstance.js';

// Import the Sequelize instance for the Grab database
const sequelize = getSequelizeInstance({ database: 'grab' });
// util to get client IP
const getClientIP = (req) => {
    return req.headers["x-forwarded-for"] || req.connection.remoteAddress;
};

export const index = (req, res) => {
    const clientIP = getClientIP(req);
    console.log(`Request from IP: ${clientIP}`);
    res.json({
        message: "Congrats! You reached this endpoint.",
        client_ip: clientIP,
    });
};

/*
Use to test database connection
route - /api/v1/grab/testdb
*/
export const testDB = async (req, res) => {
    try {
        await sequelize.authenticate()
        // Get MySQL version and selected database name
        const [[versionResult], [dbResult]] = await Promise.all([
            sequelize.query('SELECT VERSION() AS `version`'),
            sequelize.query('SELECT DATABASE() AS `database`'),
        ]);

        res.status(200).json({
            message: "Database connected",
            success: true,
            payload: {
                version: versionResult[0]?.version,
                database: dbResult[0]?.database,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Unable to connect to the database: ${error}`
        })
        console.log('Unable to connect to the database: ', error);
    }
}
/*
Order dispatch Webhook (Receive Orders)
route - /api/v1/grab/orders
*/
export const receiveOrder = async (req, res) => {
    const payload = req.body;

    const transaction = await sequelize.transaction();

    try {
        // 1. Store the order
        const order = await Orders.create({
            order_id: payload.orderID,
            short_order_number: payload.shortOrderNumber,
            merchant_id: payload.merchantID,
            partner_merchant_id: payload.partnerMerchantID,
            payment_type: payload.paymentType,
            cutlery: payload.cutlery ? 1 : 0,
            order_time: payload.orderTime,
            schedule_time: payload.scheduledTime,
            currency_code: payload.currency.code,
            currency_symbol: payload.currency.symbol,
            currency_exponent: payload.currency.exponent,
            order_accepted_type: payload.featureFlags.orderAcceptedType,
            order_type: payload.featureFlags.orderType,
            is_mex_edit_order: payload.featureFlags.isMexEditOrder ? 1 : 0,
            subtotal: payload.price.subtotal,
            tax: payload.price.tax,
            merchant_charge_fee: payload.price.merchantChargeFee,
            grab_fund_promo: payload.price.grabFundPromo,
            merchant_fund_promo: payload.price.merchantFundPromo,
            basket_promo: payload.price.basketPromo,
            delivery_fee: payload.price.deliveryFee,
            small_order_fee: payload.price.smallOrderFee,
            eater_payment: payload.price.eaterPayment,
            total: payload.price.total,
            table_id: payload.dineIn?.tableID || null,
            eater_count: payload.dineIn?.eaterCount || null,
            receiver: payload.receiver,
            allow_change: payload.orderReadyEstimation.allowChange ? 1 : 0,
            estimate_order_ready_time: payload.orderReadyEstimation.estimatedOrderReadyTime,
            max_order_ready_time: payload.orderReadyEstimation.maxOrderReadyTime,
            new_order_ready_time: payload.orderReadyEstimation.newOrderReadyTime,
            membership_id: payload.membershipID,
            raw_payload: payload,
        }, { transaction });

        // 2. Store items (orderlines) and modifiers
        for (const item of payload.items) {
            const orderline = await Orderline.create({
                order_id: order.id,
                item_id: item.id,
                grab_item_id: item.grabItemID,
                quantity: item.quantity,
                price: item.price,
                tax: item.tax,
                specifications: item.specifications,
                out_of_stock_instruction: item.outOfStockInstruction,
            }, { transaction });

            for (const mod of item.modifiers || []) {
                await Modifiers.create({
                    orderline_id: orderline.id,
                    mod_id: mod.id,
                    price: mod.price,
                    tax: mod.tax,
                    quantity: mod.quantity,
                }, { transaction });
            }
        }

        // 3. Store campaigns
        for (const campaign of payload.campaigns || []) {
            await Campaigns.create({
                order_id: order.id,
                campaign_id: campaign.id,
                name: campaign.name,
                campaign_name_for_mex: campaign.campaignNameForMex,
                level: campaign.level,
                type: campaign.type,
                usage_count: campaign.usageCount,
                mex_funded_ratio: campaign.mexFundedRatio,
                deducted_amount: campaign.deductedAmount,
                deducted_part: campaign.deductedPart,
                applied_item_ids: campaign.appliedItemIDs,
                free_item_id: campaign.freeItem?.id || null,
                free_item_name: campaign.freeItem?.name || null,
                free_item_quantity: campaign.freeItem?.quantity || null,
                free_item_price: campaign.freeItem?.price || null,
            }, { transaction });
        }

        // 4. Store promos
        for (const promo of payload.promos || []) {
            await Promos.create({
                order_id: order.id,
                code: promo.code,
                description: promo.description,
                name: promo.name,
                promo_amount: promo.promoAmount,
                mex_funded_ratio: promo.mexFundedRatio,
                mex_funded_amount: promo.mexFundedAmount,
                targeted_price: promo.targetedPrice,
                promo_amount_in_min: promo.promoAmountInMin,
            }, { transaction });
        }

        await transaction.commit();
        res.status(201).json({ success: true, message: "Order stored successfully" });
    } catch (error) {
        await transaction.rollback();
        console.error("Failed to store order:", error);
        res.status(500).json({ success: false, message: "Failed to store order", error });
    }

}

/*
Retrieve Orders Webhook (Display Orders to Client)
route - /api/v1/grab/orders/raw
*/
export const getOrders = async (req, res) => {
    try {
        const orders = await Orders.findAll({
            attributes: ['id', 'raw_payload']
        })
        // Parse raw_payload JSON string
        const payload = orders.map(order => {


            const parsedPayload = typeof order.raw_payload === 'string'
                ? JSON.parse(order.raw_payload)
                : order.raw_payload;

            return {
                id: order.id,
                raw_payload: parsedPayload
            };
        });
        const count = payload.length;
        res.status(200).json({
            count,
            payload
        })
    } catch (err) {
        console.error("Order processing failed:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}