const Order = require('../models/orderModel');

const orderController = {
    getAllOrders: (req, res) => {
        Order.getAll((err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    },
    getOrderById: (req, res) => {
        Order.getById(req.params.id, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!results[0]) return res.status(404).json({ message: 'Order not found' });
            Order.getItemsByOrderId(req.params.id, (err, items) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ order: results[0], items });
            });
        });
    },
    createOrder: (req, res) => {
        const orderData = req.body;
        Order.create(orderData, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: result.insertId, ...orderData });
        });
    }
};

module.exports = orderController;