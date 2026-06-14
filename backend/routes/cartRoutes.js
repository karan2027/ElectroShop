const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// ➤ ADD TO CART
router.post("/add", async (req, res) => {
  try {
    const { userId, product } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // agar cart nahi hai → new cart banao
      cart = new Cart({
        userId,
        items: [product]
      });
    } else {
      // agar same product already hai → quantity badhao
      const existingItem = cart.items.find(
        item => item.productId === product.productId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push(product);
      }
    }

    await cart.save();

    res.json({ message: "Item added to cart ✅", cart });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ➤ GET USER CART
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ➤ REMOVE ITEM
router.delete("/remove", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) return res.json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.productId !== productId);

    await cart.save();

    res.json({ message: "Item removed ❌", cart });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;