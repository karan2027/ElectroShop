const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

let otpStore = {};

router.post("/send", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.endsWith("@gmail.com")) {
      return res.status(400).json({ message: "Valid Gmail required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    otpStore[email] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "ElectroShop OTP Verification",
      text: `Your ElectroShop OTP is ${otp}. It is valid for 5 minutes.`
    });

    res.json({ message: "OTP sent successfully ✅" });

  } catch (error) {
    res.status(500).json({ message: "OTP send failed ❌", error: error.message });
  }
});

router.post("/verify", (req, res) => {
  const { email, otp } = req.body;

  const savedOtp = otpStore[email];

  if (!savedOtp) {
    return res.status(400).json({ message: "OTP not found. Send OTP again." });
  }

  if (Date.now() > savedOtp.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ message: "OTP expired ❌" });
  }

  if (String(savedOtp.otp) !== String(otp)) {
    return res.status(400).json({ message: "Invalid OTP ❌" });
  }

  delete otpStore[email];

  res.json({ message: "OTP verified ✅" });
});

module.exports = router;