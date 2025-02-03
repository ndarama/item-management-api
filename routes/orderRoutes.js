const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');  // Correctly import the controller

// Define the routes and ensure all callbacks are defined
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
