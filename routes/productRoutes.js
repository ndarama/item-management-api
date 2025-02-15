const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.get('/', isAuthenticated, productController.getAllProducts);
router.get('/:id', isAuthenticated, productController.getProductById);
router.post('/', isAuthenticated, productController.createProduct);
router.put('/:id', isAuthenticated, productController.updateProduct);
router.delete('/:id', isAuthenticated, productController.deleteProduct);

module.exports = router;
