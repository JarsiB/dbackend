const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

/* ================= CREATE ORDER ================= */
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Order create failed", error: err.message });
  }
});

/* ================= GET ALL ORDERS (ADMIN) ================= */
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Fetch orders failed" });
  }
});

/* ================= UPDATE ORDER STATUS ================= */
router.put("/:id/status", async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
    });
    res.json({ message: "Order status updated" });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;
