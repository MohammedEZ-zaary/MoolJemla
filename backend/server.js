const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config.json');

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
// 3. MONGODB CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/MoolJemal')
  .then(() => console.log('✅ Connected to local MongoDB (MoolJemal)'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 MoolJemal backend running on http://localhost:${PORT}`);
});