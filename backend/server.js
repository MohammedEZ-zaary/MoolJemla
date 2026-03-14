const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config.json');
require('dotenv').config();
//VARIABLES 
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// 1. Import Routes FIRST
const orderRoutes = require('./routes/orders');
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

const app = express();

// 2. Middleware
app.use(express.json());
app.use(cors());
app.use(express.json()); // <--- THIS MUST BE BEFORE YOUR ROUTES
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  if (req.path === '/api/orders' && req.method === 'POST') {
    console.log("🕵️ SPY LOG - Body entering server:", req.body);
    console.log("🕵️ SPY LOG - Headers:", req.headers['content-type']);
  }
  next();
});
// 4. UPLOADS DIRECTORY SETUP
const productPath = path.resolve(__dirname, config.IMAGES_PRODUCT_PATH);
const profilePath = path.resolve(__dirname, config.IMAGES_PROFILE_PATH);

if (!fs.existsSync(productPath)) fs.mkdirSync(productPath, { recursive: true });
if (!fs.existsSync(profilePath)) fs.mkdirSync(profilePath, { recursive: true });

// Static folders for images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 5. MULTER CONFIGURATION
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (req.originalUrl.includes('/products')) {
            cb(null, productPath);
        } else if (req.originalUrl.includes('/users')) {
            cb(null, profilePath);
        } else {
            cb(new Error('Invalid upload route'));
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// 6. APPLY ROUTES
// All your API endpoints are now registered correctly
app.use('/api', orderRoutes);
app.use('/api', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// ADD THIS LINE: Make the tickets folder public too!
app.use('/tickets', express.static(path.join(__dirname, 'tickets')));

// 7. PRODUCT UPLOAD ENDPOINT (For Admin)
// Use the 'upload' middleware defined above
app.post('/api/products', upload.single('productImage'), async (req, res) => {
    try {
        const Product = require('./models/Product');
        const newProduct = new Product({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            imagePath: `/uploads/products/${req.file.filename}`
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// PRODUCTION
// 1. Serve the static files from the Vue 'dist' directory
console.log(path.join(__dirname, '../frontend/dist'));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});
const PORT = process.env.PORT || 3000;
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to Remote MongoDB Atlas (MoolJemal)');
    
    // START SERVER ONLY AFTER DB CONNECTS
    app.listen(PORT, () => {
      console.log(`🚀 MoolJemal backend running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ CRITICAL: MongoDB Connection Error:', err.message);
    process.exit(1); // Stop the app if it can't reach the database
  });