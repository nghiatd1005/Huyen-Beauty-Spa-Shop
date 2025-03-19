const express = require('express');
const route = require('./routes')
const cors = require('cors');

require('dotenv').config();

const app = express();

// Bật CORS cho frontend
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());

route(app);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server chạy trên cổng ${PORT}`);
});