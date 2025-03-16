const db = require('../config/db');

const Product = {
    getAll: (callback) => {
        db.query('SELECT * FROM products', (err, results) => {
            if (err) return callback(err);
            callback(null, results); // Trả về mảng rỗng nếu không có dữ liệu
        });
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM products WHERE id = ?', [id], callback);
    }
};

module.exports = Product;