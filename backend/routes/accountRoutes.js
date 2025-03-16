const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const authMiddleware = require('../middleware/auth');

router.post('/login', accountController.login);
router.post('/register', accountController.register);
router.put('/:id/role', authMiddleware, accountController.updateRole);
router.get('/me', authMiddleware, accountController.getCurrentUser);

module.exports = router;