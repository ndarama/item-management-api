const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

router.get('/', isAuthenticated, orderController.getAllOrders);
router.get('/:id', isAuthenticated, orderController.getOrderById);
router.post('/', isAuthenticated, isAdmin, orderController.createOrder);
router.put('/:id', isAuthenticated, isAdmin, orderController.updateOrder);
router.delete('/:id', isAuthenticated, isAdmin, orderController.deleteOrder);

module.exports = router;
