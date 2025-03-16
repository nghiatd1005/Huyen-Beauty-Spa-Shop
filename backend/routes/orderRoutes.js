// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, orderController.getAllOrders);
router.get('/:id', authMiddleware, orderController.getOrderById);
router.post('/', authMiddleware, orderController.createOrder);

module.exports = router;