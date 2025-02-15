const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { isAuthenticated} = require('../middleware/authMiddleware');

router.get('/', isAuthenticated, orderController.getAllOrders);
router.get('/:id', isAuthenticated, orderController.getOrderById);
router.post('/', isAuthenticated, orderController.createOrder);
router.put('/:id', isAuthenticated, orderController.updateOrder);
router.delete('/:id', isAuthenticated, orderController.deleteOrder);

module.exports = router;
