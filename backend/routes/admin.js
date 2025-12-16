// const express = require("express");
// const Category = require("../models/Category");
// const Product = require("../models/Product");
// const router = express.Router();

// // Categories
// router.post("/category", async (req, res) => {
//   const category = new Category(req.body);
//   await category.save();
//   res.json(category);
// });

// router.get("/categories", async (req, res) => {
//   res.json(await Category.find());
// });

// // Products
// router.post("/product", async (req, res) => {
//   const product = new Product(req.body);
//   await product.save();
//   res.json(product);
// });

// router.get("/bestsellers", async (req, res) => {
//   res.json(await Product.find({ isBestseller: true }));
// });


// router.get("/stats", async (req, res) => {
//   try {
//     const totalProducts = await Product.countDocuments();
//     const activeCategories = await Category.countDocuments();
//     const bestsellers = await Product.countDocuments({ isBestseller: true });

//     // Example stock (if stock field illa na simple sum illama static)
//     const totalStock = totalProducts * 50;

//     res.json({
//       totalProducts,
//       activeCategories,
//       bestsellers,
//       totalStock,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Stats fetch failed" });
//   }
// });
// // UPDATE CATEGORY
// router.put("/category/:id", async (req, res) => {
//   const updated = await Category.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );
//   res.json(updated);
// });

// // DELETE CATEGORY
// router.delete("/category/:id", async (req, res) => {
//   await Category.findByIdAndDelete(req.params.id);
//   res.json({ message: "Category deleted" });
// });
// // GET ALL PRODUCTS
// router.get("/products", async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// });


// module.exports = router;

const express = require("express");
const router = express.Router();

const Category = require("../models/Category");
const Product = require("../models/Product");

/* ================= CATEGORIES ================= */
router.get("/test", (req, res) => {
  res.send("ADMIN API WORKING");
});

// ================= DASHBOARD STATS =================
router.get("/stats", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const activeCategories = await Category.countDocuments();
    const bestsellers = await Product.countDocuments({ isBestseller: true });

    const stockAgg = await Product.aggregate([
      { $group: { _id: null, total: { $sum: "$stock" } } },
    ]);

    const totalStock = stockAgg[0]?.total || 0;

    res.json({
      totalProducts,
      activeCategories,
      bestsellers,
      totalStock,
    });
  } catch (err) {
    res.status(500).json({ message: "Stats fetch failed" });
  }
});

// GET ALL CATEGORIES
router.get("/categories", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// CREATE CATEGORY
router.post("/category", async (req, res) => {
  const category = new Category(req.body);
  await category.save();
  res.json(category);
});

// UPDATE CATEGORY
router.put("/category/:id", async (req, res) => {
  await Category.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Category updated" });
});

// DELETE CATEGORY
router.delete("/category/:id", async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted" });
});

/* ================= PRODUCTS ================= */

// GET ALL PRODUCTS  🔥 (THIS IS WHAT YOUR FRONTEND NEEDS)
router.get("/products", async (req, res) => {
  res.json(await Product.find());
});

router.post("/product", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});
// ✅ UPDATE PRODUCT
router.put("/product/:id", async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Product updated" });
});
// router.put("/product/:id", async (req, res) => {
//   const updated = await Product.findByIdAndUpdate(
//     req.params.id,
//     { $set: req.body },
//     { new: true }
//   );
//   res.json(updated);
// });


// ✅ DELETE PRODUCT
router.delete("/product/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

module.exports = router;
