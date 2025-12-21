const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: String,
      phone: String,
      address: String,
      city: String,
      pincode: String,
    },

    items: [
      {
        productId: String,
        title: String,
        image: String,
        variant: Object,
        qty: Number,
        price: Number,
      },
    ],

    total: Number,

    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
