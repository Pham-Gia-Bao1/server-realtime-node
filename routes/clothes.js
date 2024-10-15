const express = require('express');
const router = express.Router();
const {
  createClothes,
  getAllClothes,
  getClothesById,
  updateClothes,
  deleteClothes
} = require('../controllers/clothesController');

// Route for creating a new product (Create)
router.post('/products', createClothes);

// Route for getting all products (Read All)
router.get('/products', getAllClothes);

// Route for getting a specific product by ID (Read One)
router.get('/products/:id', getClothesById);

// Route for updating a product by ID (Update)
router.put('/products/:id', updateClothes);

// Route for deleting a product by ID (Delete)
router.delete('/products/:id', deleteClothes);

module.exports = router;
