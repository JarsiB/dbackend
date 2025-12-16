const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

// Register
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, phone, password, confirmPassword } = req.body;
//     if (!email || !phone || !password || !confirmPassword) {
//       return res
//         .status(400)
//         .json({ message: "Please provide all required fields." });
//     }
//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match." });
//     }

//     // check if email or phone already exists
//     const existingEmail = await User.findOne({ email });
//     if (existingEmail)
//       return res.status(400).json({ message: "Email already registered." });

//     const existingPhone = await User.findOne({ phone });
//     if (existingPhone)
//       return res.status(400).json({ message: "Phone already registered." });

//     const passwordHash = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name: name || "",
//       email,
//       phone,
//       passwordHash,
//     });

//     await newUser.save();

//     return res.status(201).json({ message: "User registered successfully." });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server error." });
//   }
// });
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // 👇 AUTO ROLE LOGIC
    let role = "user";
    if (email === "admin@dsaki.com") {
      role = "admin";
    }

    const newUser = new User({
      name,
      email,
      phone,
      passwordHash,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// Login
// router.post("/login", async (req, res) => {
//   try {
//     const { emailOrPhone, password } = req.body;
//     if (!emailOrPhone || !password)
//       return res.status(400).json({ message: "Please provide credentials." });

//     // find by email or phone
//     const user = await User.findOne({
//       $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
//     });
//     if (!user) return res.status(400).json({ message: "Invalid credentials." });

//     const isMatch = await bcrypt.compare(password, user.passwordHash);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials." });

//     // create JWT
//     const payload = { userId: user._id, email: user.email };
//     const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

//     return res.json({ token, message: "Login successful." });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server error." });
//   }
// });
// Login
router.post("/login", async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!user) return res.status(400).json({ message: "Invalid credentials." });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials." });

    const payload = {
      userId: user._id,
      role: user.role, // 👈 ADD ROLE
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

    return res.json({
      token,
      role: user.role, // 👈 SEND ROLE
      message: "Login successful",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// Protected example route
router.get("/protected", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No token provided." });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided." });

    const decoded = jwt.verify(token, JWT_SECRET);
    // you can fetch user details if needed
    const user = await User.findById(decoded.userId).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found." });

    return res.json({ message: "This is protected data.", user });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token." });
  }
});

module.exports = router;
