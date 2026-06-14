const express = require("express");
const multer = require("multer");
const path = require("path");
const Review = require("../models/Review");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/reviews");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }
});

router.post("/add", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { productId, productName, rating, comment } = req.body;

    if (!productId || !productName) {
      return res.status(400).json({ message: "Product information missing" });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    if (!comment || comment.trim() === "") {
      return res.status(400).json({ message: "Review cannot be empty" });
    }

    const alreadyReviewed = await Review.findOne({
      userId: req.user.id,
      productId
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        message: "You already reviewed this product"
      });
    }

    const imagePath = req.file ? `/uploads/reviews/${req.file.filename}` : "";

    const review = await Review.create({
      userId: req.user.id,
      userName: req.user.name || "User",
      productId,
      productName,
      rating,
      comment,
      image: imagePath
    });

    res.status(201).json({
      message: "Review submitted successfully",
      review
    });
  } catch (error) {
    res.status(500).json({ message: "Review submit failed", error: error.message });
  }
});

router.get("/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId })
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Reviews fetch failed" });
  }
});

module.exports = router;