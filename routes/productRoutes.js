const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

router.get('/', isAuthenticated, productController.getAllProducts);
router.get('/:id', isAuthenticated, productController.getProductById);
router.post('/', isAuthenticated, isAdmin, productController.createProduct);
router.put('/:id', isAuthenticated, isAdmin, productController.updateProduct);
router.delete('/:id', isAuthenticated, isAdmin, productController.deleteProduct);

module.exports = router;
