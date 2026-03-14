const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const auth = require('../middleware/auth'); // Ensures only logged-in users can order
const BidiJS = require('bidi-js');



// ==========================================
// GET: Get orders for logged-in user (Page 4)
// ==========================================
router.get('/orders/my-orders', auth, async (req, res) => {
  try {
    // req.user.id comes securely from the JWT token
    const orders = await Order.find({ userId: req.user.id })
      .populate('products.productId', 'title imagePath')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// GET: All orders (Admin Dashboard Page 3)
// ==========================================
router.get('/orders', auth, async (req, res) => {
  try {
    // SECURITY FIX: Filter by the logged-in user's ID
    const orders = await Order.find({})
      .populate('products.productId')
      .sort({ createdAt: -1 }); // Keep newest orders at the top

    res.json(orders);
  } catch (error) {
    console.error("Fetch Orders Error:", error);
    res.status(500).json({ error: "Could not fetch your orders" });
  }
});

router.get('/user-orders', auth, async (req, res) => {
  try {
    // SECURITY FIX: Filter by the logged-in user's ID
    const orders = await Order.find({ userId: req.user.id })
      .populate('products.productId')
      .sort({ createdAt: -1 }); // Keep newest orders at the top

    res.json(orders);
  } catch (error) {
    console.error("Fetch Orders Error:", error);
    res.status(500).json({ error: "Could not fetch your orders" });
  }
});
// ==========================================
// PUT: Confirm Order & Generate PDF Ticket (Admin)
// ==========================================
// router.put('/admin/orders/:orderId/status', auth, async (req, res) => {
//   try {
//     if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admins only' });

//     const { status } = req.body;
//     const orderId = req.params.orderId;
    
//     const order = await Order.findById(orderId).populate('userId').populate('products.productId');
//     const admin = await User.findById(req.user.id);

//     if (!order) return res.status(404).json({ message: 'Order not found' });

//     // 1. ALWAYS update the database immediately (This handles 'done', 'confirmed', etc.)
//     order.status = status;
//     await order.save();

//     // 2. Check if we need a PDF (If it is 'confirmed' OR 'done')
//     if (status === 'confirmed' || status === 'done') {
//       const fs = require('fs');
//       const path = require('path');
      
//       const ticketDir = path.join(__dirname, '../tickets');
//       const fileName = `Ticket_${orderId}.pdf`; 
//       const filePath = path.join(ticketDir, fileName);

//       // 3. SMART CHECK: Does the file already exist? 
//       // If it exists, we skip the PDF creation entirely!
//       if (!fs.existsSync(filePath)) {
//         const PDFDocument = require('pdfkit');
//         if (!fs.existsSync(ticketDir)) fs.mkdirSync(ticketDir, { recursive: true });

//         const doc = new PDFDocument({ margin: 50 });
//         doc.pipe(fs.createWriteStream(filePath));

//         const date = new Date();
//         doc.fontSize(20).text('MoolJemal', { align: 'center' }).moveDown();
//         doc.fontSize(12).text('Order Receipt', { align: 'center' }).moveDown();
//         doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke().moveDown();

//         const custFirstName = order.userId?.firstName || 'Unknown';
//         const custLastName = order.userId?.lastName || 'Customer';

//         doc.fontSize(12)
//            .text(`Date: ${date.toLocaleDateString()} | Time: ${date.toLocaleTimeString()}`)
//            .text(`Vendor: ${admin.firstName} ${admin.lastName}`)
//            .text(`Customer: ${custFirstName} ${custLastName}`)
//            .text(`Command ID: #${order._id.toString().slice(-6)}`).moveDown();
        
//         doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke().moveDown();
//         doc.fontSize(14).text('Products:', { underline: true }).moveDown(0.5);
        
//         doc.fontSize(12);
//         order.products.forEach(item => {
//           const title = item.productId?.title || 'Unknown Product';
//           const price = item.priceAtPurchase || 0;
//           doc.text(`${item.quantity}x  ${title}`, { continued: true })
//              .text(`$${price}`, { align: 'right' });
//         });

//         doc.moveDown().moveTo(50, doc.y).lineTo(550, doc.y).stroke().moveDown();
//         doc.fontSize(16).font('Helvetica-Bold')
//            .text('TOTAL PRIX:', { continued: true })
//            .text(`$${order.totalPrice || 0}`, { align: 'right' });
//         doc.end();
        
//         console.log(`[Success] New PDF generated for Order ${orderId}`);
//       } else {
//         console.log(`[Skipped] PDF already exists for Order ${orderId}`);
//       }
//     }

//     // Send success response back to Vue
//     res.json({ message: `Order correctly updated to ${status}` });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
// Helper function to fix Arabic text
router.put('/admin/orders/:orderId/status', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Accès refusé' });

    const { status } = req.body;
    const orderId = req.params.orderId;
    
    const order = await Order.findById(orderId).populate('userId').populate('products.productId');
    const admin = await User.findById(req.user.id);

    if (!order) return res.status(404).json({ message: 'Commande non trouvée' });

    order.status = status;
    await order.save();

    if (status === 'confirmed' || status === 'done') {
      const fs = require('fs');
      const path = require('path');
      const PDFDocument = require('pdfkit');
      const arabicReshaper = require('arabic-reshaper'); // Ensure you installed 'arabic-reshaper'
      
      const ticketDir = path.join(__dirname, '../tickets');
      const fileName = `Ticket_${orderId}.pdf`; 
      const filePath = path.join(ticketDir, fileName);

      // --- THE SMART ARABIC HELPER ---
      const ar = (text) => {
        if (!text) return '';
        try {
          const reshaped = arabicReshaper.reshape(text);
          // Only reverse if it contains Arabic characters
          const hasArabic = /[\u0600-\u06FF]/.test(text);
          return hasArabic ? reshaped.split('').reverse().join('') : text;
        } catch (err) {
          return text;
        }
      };

      if (!fs.existsSync(filePath)) {
        if (!fs.existsSync(ticketDir)) fs.mkdirSync(ticketDir, { recursive: true });

        const doc = new PDFDocument({ margin: 40, size: 'A5' });
        doc.pipe(fs.createWriteStream(filePath));

        const arabicFontPath = path.join(__dirname, '../fonts/Amiri-Regular.ttf'); 
        doc.registerFont('ArabicFont', arabicFontPath);

        // --- HEADER ---
        doc.rect(0, 0, doc.page.width, 40).fill('#000000');
        doc.fillColor('#FFFFFF')
           .font('ArabicFont')
           .fontSize(22)
           .text(ar('جملة مول'), 0, 5, { align: 'center' });

        // --- SECTION TITLE ---
        doc.fillColor('#000000').moveDown(1);
        doc.fontSize(16).text(ar('الطلبية تأكيد'), { align: 'center' });
        doc.moveDown(0);

        doc.moveTo(20, doc.y).lineTo(doc.page.width - 40, doc.y).lineWidth(2).stroke().moveDown(1);

        // --- CUSTOMER INFO ---
        const custName = `${order.customerInfo?.firstName || order.userId?.firstName || ''} ${order.customerInfo?.lastName || order.userId?.lastName || ''}`;
        
        doc.font('ArabicFont').fontSize(11)
           .text(ar(  `${custName} الزبون: `), { align: 'right' })
           .text(ar(`${new Date().toLocaleDateString('fr-FR')} التاريخ: `), { align: 'right' })
           .text(ar(` ${order._id.toString().slice(-6)} الطلب رقم :`), { align: 'right' })
           .text(ar(` ${admin.firstName} ${admin.lastName} البائع: `), { align: 'right' })
           .moveDown(1);

        // --- PRODUCTS TABLE ---
        doc.fontSize(13).text(ar('تفاصيل السلع :'), { align: 'right', underline: true }).moveDown(1);

        doc.fontSize(10);
        order.products.forEach(item => {
          const title = item.productId?.title || 'منتج';
          const subTotal = `${(item.priceAtPurchase * item.quantity).toFixed(2)} MAD`;
          const currentY = doc.y;

          // Price on left (Normal font for numbers)
          doc.font('Helvetica').text(subTotal, 40, currentY, { align: 'left' });
          
          // Arabic Title on right
          doc.font('ArabicFont').text(ar(`${title} (x${item.quantity})`), 40, currentY, { align: 'right' });
          doc.moveDown(0.5);
        });

        // --- FOOTER : TOTAL ---
        doc.moveDown(2);
        const footerY = doc.y;
        doc.rect(40, footerY, doc.page.width - 80, 45).fill('#000000');
        
        doc.fillColor('#FFFFFF').font('ArabicFont').fontSize(18);
        doc.text(ar('المجموع الواجب أداؤه:'), 55, footerY + 13, { align: 'right' });
        
        doc.font('Helvetica-Bold').fontSize(18);
        doc.text(`${order.totalPrice} MAD`, 55, footerY + 13, { align: 'left' });

        doc.end();
      }
    }

    res.json({ message: `Statut mis à jour en arabe` });
  } catch (error) {
    console.error("Erreur Route :", error);
    res.status(500).json({ error: error.message });
  }
});
// ==========================================
// GET: Download Ticket PDF securely
// ==========================================
router.get('/orders/:orderId/ticket', auth, async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);

    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Security: Only Admin OR the user who made the order can download it
    if (req.user.role !== 'admin' && req.user.id !== order.userId.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const fileName = `Ticket_${orderId}.pdf`;
    const filePath = path.join(__dirname, '../tickets', fileName);

    // Check if the PDF was actually generated
    const fs = require('fs');
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Ticket not generated yet.' });
    }

    // res.download forces the browser to save the file
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("Download Error:", err);
        if (!res.headersSent) {
          res.status(500).json({ message: "Could not download the file" });
        }
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.post('/orders', auth, async (req, res) => {
  console.log("--- NEW ORDER ATTEMPT ---");

  try {
    const { products, totalPrice } = req.body;

    // 2. FETCH USER DATA FROM DATABASE
    // We use req.user.id which comes from the Auth Middleware
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 3. SANITIZE PRODUCTS
    const sanitizedProducts = products.map(p => ({
      productId: p.productId,
      quantity: Number(p.quantity) || 1,
      priceAtPurchase: Number(p.priceAtPurchase) || 0
    }));

    // 4. CREATE ORDER WITH DB DATA
    const newOrder = new Order({
      userId: req.user.id,
      products: sanitizedProducts,
      totalPrice: Number(totalPrice),
      customerInfo: {
        // Here we map the fields from your User model
        // Make sure these field names match your User schema!
        firstName: user.firstName, 
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber || user.phone // adjust to match your schema
      }
    });

    const savedOrder = await newOrder.save();
    console.log("✅ ORDER SAVED WITH USER DATA");
    res.status(201).json(savedOrder);

  } catch (error) {
    console.error("❌ ERROR:", error.message);
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;