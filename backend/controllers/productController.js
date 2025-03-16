const Product = require('../models/productModel');

const productController = {
    getAllProducts: (req, res) => {
        Product.getAll((err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    },
    getProductById: (req, res) => {
        Product.getById(req.params.id, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results[0]);
        });
    }
};

module.exports = productController;