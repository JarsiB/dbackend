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








// main

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

//     /* ⭐ FILTER FIELDS ⭐ */

//     healthGoal: {
//       type: String,
//       enum: [
//         "kids",
//         "diabetic",
//         "women-40+",
//         "senior",
//         "weight-loss",
//         "general",
//       ],
//       default: "general",
//     },

//     packSize: {
//       type: String,
//       enum: ["100g", "250g", "500g", "1kg"],
//       default: "250g",
//     },

//     sugarFree: {
//       type: Boolean,
//       default: false,
//     },

//     sprouted: {
//       type: Boolean,
//       default: true,
//     },

//     isBestseller: {
//       type: Boolean,
//       default: false,
//     },

//     /* OPTIONAL – FUTURE USE */
//     views: {
//       type: Number,
//       default: 0,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Product", productSchema);

// #####33
// const mongoose = require("mongoose");

// const variantSchema = new mongoose.Schema({
//   size: {
//     type: String,
//     enum: ["100g", "250g", "500g", "1kg"],
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   stock: {
//     type: Number,
//     default: 0,
//   },
// });

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

//     variants: {
//       type: [variantSchema],
//       required: true,
//     },

//     image: {
//       type: String,
//       default: "",
//     },

//     sugarFree: {
//       type: Boolean,
//       default: false,
//     },

//     sprouted: {
//       type: Boolean,
//       default: true,
//     },

//     isBestseller: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Product", productSchema);
const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  size: {
    type: String,
    enum: ["100g", "250g", "500g", "1kg"],
    required: true,
  },
  price: Number,
  stock: Number,
});

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: String,

    // 🔥 BASE64 IMAGE
    image: {
      type: String, // base64 string
      required: true,
    },

    variants: [variantSchema],

    sugarFree: Boolean,
    sprouted: Boolean,
    isBestseller: Boolean,
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

//     /* ⭐ VARIANT PACK SIZES ⭐ */
//     variants: [
//       {
//         size: {
//           type: String,
//           enum: ["100g", "250g", "500g", "1kg"],
//           required: true,
//         },
//         price: {
//           type: Number,
//           required: true,
//         },
//         stock: {
//           type: Number,
//           default: 0,
//         },
//       },
//     ],

//     image: {
//       type: String,
//       default: "",
//     },

//     /* ⭐ FILTER FIELDS ⭐ */
//     healthGoal: {
//       type: String,
//       enum: [
//         "kids",
//         "diabetic",
//         "women-40+",
//         "senior",
//         "weight-loss",
//         "general",
//       ],
//       default: "general",
//     },

//     sugarFree: {
//       type: Boolean,
//       default: false,
//     },

//     sprouted: {
//       type: Boolean,
//       default: true,
//     },

//     isBestseller: {
//       type: Boolean,
//       default: false,
//     },

//     views: {
//       type: Number,
//       default: 0,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Product", productSchema);

// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     title: String,
//     category: String,
//     description: String,
//     price: Number,
//     stock: Number,
//     image: String,

//     // ✅ ONLY THESE 3 FILTERS
//     isSugarFree: { type: Boolean, default: false },
//     isSprouted: { type: Boolean, default: false },
//     isBestseller: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Product", productSchema);


// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true, trim: true },
//     category: { type: String, required: true },
//     description: { type: String, default: "" },
//     price: { type: Number, required: true },
//     stock: { type: Number, default: 0 },
//     image: { type: String, default: "" },

//     isSugarFree: { type: Boolean, default: false },
//     isSprouted: { type: Boolean, default: false },
//     isBestseller: { type: Boolean, default: false },

//     healthGoal: {
//       type: String,
//       enum: [
//         "kids",
//         "diabetic",
//         "women-40+",
//         "senior",
//         "weight-loss",
//         "general",
//       ],
//       default: "general",
//     },

//     packSize: {
//       type: String,
//       enum: ["100g", "250g", "500g", "1kg"],
//       default: "250g",
//     },

//     views: { type: Number, default: 0 },
//   },
//   {
//     timestamps: true,
//     strict: false, // 🔥 THIS IS THE KEY
//   }
// );

// module.exports = mongoose.model("Product", productSchema);











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
