
const reviewRoutes = require("./routes/reviewRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const otpRoutes = require("./routes/otpRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");
require("dotenv").config();

// Force Google DNS for MongoDB Atlas SRV lookup
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/otp", otpRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/reviews", reviewRoutes);


app.get("/", (req, res) => {
  res.send("ElectroShop Backend Running ✅");
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.log("❌ MONGO_URI missing in .env file");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error ❌", error.message);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});