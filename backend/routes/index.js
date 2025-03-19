const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');
const accountRoutes = require('./accountRoutes');

function route(app) {
    app.use('/api/products', productRoutes);
    app.use('/api/orders', orderRoutes);
    app.use('/api/accounts', accountRoutes);
    
    app.get('/', (req, res) => {
        res.send('Backend MVC đang chạy');
    });
}

module.exports = route ; 