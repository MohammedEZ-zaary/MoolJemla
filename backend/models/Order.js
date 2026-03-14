const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
//   // Update this section to be an Array
//   products: [{
//     productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//     quantity: { type: Number, default: 1 },
//     priceAtPurchase: { type: Number } 
//   }],

//   totalPrice: { type: Number, required: true },
//   status: { 
//     type: String, 
//     enum: ['on possessing', 'confirmed', 'cancelled'], 
//     default: 'on possessing' 
//   }
// }, { timestamps: true });


const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // ADD THESE FIELDS
  customerInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true }
  },

  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 },
    priceAtPurchase: { type: Number } 
  }],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'on possessing' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);