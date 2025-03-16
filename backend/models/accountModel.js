const db = require('../config/db');

const Account = {
    getByEmail: (email, callback) => {
        db.query('SELECT * FROM accounts WHERE email = ?', [email], callback);
    },
    create: (accountData, callback) => {
        db.query(
            'INSERT INTO accounts (email, password, role, is_active) VALUES (?, ?, ?, ?)',
            [accountData.email, accountData.password, accountData.role, accountData.is_active || 1],
            callback
        );
    },
    updateLastLogin: (id, callback) => {
        db.query('UPDATE accounts SET last_login = NOW() WHERE id = ?', [id], callback);
    }
};

module.exports = Account;