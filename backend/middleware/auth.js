const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ "Bearer <token>"
    if (!token) return res.status(401).json({ message: 'Không có token, truy cập bị từ chối' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Gán thông tin user từ token vào req
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token không hợp lệ' });
    }
};

module.exports = authMiddleware;