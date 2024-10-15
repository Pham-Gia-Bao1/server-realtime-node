const express = require("express");
const router = express.Router();
const multer = require('multer');
const {
  getMessages,
  getAllMessages,
} = require("../controllers/messageController");
const {
  uploadToCloudinary,
    fetchImagesFromCloudinary
} = require("../controllers/uploadOnCloundDinaryController");
const {
  createClothes,
  getAllClothes,
  getClothesById,
  updateClothes,
  deleteClothes,
} = require("../controllers/clothesController");
// Route for getting messages between two users
router.get("/messages", getMessages);

// Route for getting all messages
router.get("/messages/all", getAllMessages);

// Route for creating a new product (Create)
router.post("/products", createClothes);

// Route for getting all products (Read All)
router.get("/products", getAllClothes);

// Route for getting a specific product by ID (Read One)
router.get("/products/:id", getClothesById);

// Route for updating a product by ID (Update)
router.put("/products/:id", updateClothes);

// Route for deleting a product by ID (Delete)
router.delete("/products/:id", deleteClothes);

// Configure multer for handling file uploads
const upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded files

// Route to upload an image
router.post('/upload-image', upload.single('file'), uploadToCloudinary);

// Route to fetch all images from Cloudinary
router.get('/images', fetchImagesFromCloudinary);

module.exports = router;
