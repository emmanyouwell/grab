import express from 'express';
import { index, testDB, receiveOrder, getOrders } from '../controllers/orderController.js';
import verifyGrabToken from '../middlewares/auth.js';

const router = express.Router();

router.get('/test', index);
router.get('/testdb', testDB);
router.post('/orders', verifyGrabToken, receiveOrder);
router.get('/orders/raw', getOrders);

export default router;
