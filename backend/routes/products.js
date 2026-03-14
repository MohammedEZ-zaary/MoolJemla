const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// ==========================================
// MULTER CONFIGURATION FOR PRODUCTS
// ==========================================
const storage = multer.diskStorage({
    destination: './uploads/products/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// ==========================================
// GET ALL PRODUCTS (For Page 1)
// ==========================================
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// GET SINGLE PRODUCT (For Page 2)
// ==========================================
router.get('/products/:id', async (req, res) => {
  console.log("Fetching product with ID:", req.params.id);
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// POST NEW PRODUCT (For Admin Dashboard)
// Notice the path is EXACTLY '/products/add'
// ==========================================
router.post('/products/add', auth, upload.single('image'), async (req, res) => {
    try {
        // Double check that the user is actually an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Forbidden: Admin access only" });
        }

        const { title, description, price, quantity } = req.body;
        
        const newProduct = new Product({
            title,
            description,
            price,
            quantity,
            // req.file.filename comes from Multer
            imagePath: `/uploads/products/${req.file.filename}` 
        });

        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;