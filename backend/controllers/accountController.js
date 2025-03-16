const Account = require('../models/accountModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

const accountController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        console.log('Yêu cầu login:', { email, password });

        Account.getByEmail(email, async (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!results[0]) return res.status(401).json({ message: 'Email không tồn tại' });

            const account = results[0];
            const match = await bcrypt.compare(password, account.password);
            if (!match) return res.status(401).json({ message: 'Mật khẩu sai' });

            const token = jwt.sign(
                { id: account.id, email: account.email, role: account.role },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            Account.updateLastLogin(account.id, (err) => {
                if (err) console.error('Cập nhật last_login lỗi:', err);
            });

            res.json({ 
                token, 
                user: { id: account.id, email: account.email, role: account.role } 
            });
        });
    },
    register: async (req, res) => {
        const { email, password, role = 'user' } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const accountData = { email, password: hashedPassword, role };

        Account.create(accountData, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: result.insertId, email, role });
        });
    },
    updateRole: (req, res) => {
        const { id } = req.params;
        const { role } = req.body;
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Chỉ admin mới có quyền cập nhật role' });
        }
        Account.updateRole(id, role, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Tài khoản không tồn tại' });
            res.json({ message: 'Cập nhật role thành công', id, role });
        });
    },
    getCurrentUser: (req, res) => {
        // Thông tin user đã được giải mã từ token trong authMiddleware
        const { id, email, role } = req.user;
        res.json({ id, email, role });
    }
};

module.exports = accountController;