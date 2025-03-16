const db = require('../config/db');

const Order = {
    getAll: (callback) => {
        db.query('SELECT * FROM orders', callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM orders WHERE id = ?', [id], callback);
    },
    create: (orderData, callback) => {
        db.query('INSERT INTO orders (account_id, total_amount, payment_status) VALUES (?, ?, ?)',
            [orderData.account_id, orderData.total_amount, orderData.payment_status], callback);
    },
    getItemsByOrderId: (orderId, callback) => {
        db.query('SELECT * FROM order_items WHERE order_id = ?', [orderId], callback);
    }
};

module.exports = Order;