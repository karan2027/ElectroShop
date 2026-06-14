const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");

// PLACE ORDER
router.post("/place", async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let subtotal = 0;

    cart.items.forEach(item => {
      subtotal += item.price * item.quantity;
    });

    const delivery = 99;
    const total = subtotal + delivery;

    const order = new Order({
      userId,
      items: cart.items,
      subtotal,
      delivery,
      total
    });

    await order.save();

    cart.items = [];
    await cart.save();

    res.json({
      message: "Order placed successfully ✅",
      order
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET USER ORDERS
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;