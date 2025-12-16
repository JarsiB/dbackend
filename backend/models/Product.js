// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String },
//     price: { type: Number, required: true },
//     image: { type: String },
//     category: { type: String },
//     isBestseller: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Product", productSchema);










const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    image: {
      type: String,
      default: "",
    },

    /* ⭐ FILTER FIELDS ⭐ */

    healthGoal: {
      type: String,
      enum: [
        "kids",
        "diabetic",
        "women-40+",
        "senior",
        "weight-loss",
        "general",
      ],
      default: "general",
    },

    packSize: {
      type: String,
      enum: ["100g", "250g", "500g", "1kg"],
      default: "250g",
    },

    sugarFree: {
      type: Boolean,
      default: false,
    },

    sprouted: {
      type: Boolean,
      default: true,
    },

    isBestseller: {
      type: Boolean,
      default: false,
    },

    /* OPTIONAL – FUTURE USE */
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);













// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     category: {
//       type: String,
//       required: true,
//     },

//     description: {
//       type: String,
//       default: "",
//     },

//     price: {
//       type: Number,
//       required: true,
//     },

//     stock: {
//       type: Number,
//       default: 0,
//     },

//     image: {
//       type: String,
//       default: "",
//     },

//     isBestseller: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Product", productSchema);
