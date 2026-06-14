const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      productId: String,
      name: String,
      price: Number,
      image: String,
      quantity: Number
    }
  ],

  subtotal: Number,
  delivery: Number,
  total: Number,

  status: {
    type: String,
    default: "Placed"
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);