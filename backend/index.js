const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const accountRoutes = require('./routes/accountRoutes');
require('dotenv').config();

const app = express();

// Bật CORS cho frontend
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/accounts', accountRoutes);

app.get('/', (req, res) => {
    res.send('Backend MVC đang chạy');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server chạy trên cổng ${PORT}`);
});