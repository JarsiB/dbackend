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
const upload = require("../middlewares/upload");

/* ================= CATEGORIES ================= */
router.get("/test", (req, res) => {
  res.send("ADMIN API WORKING");
});

// ================= DASHBOARD STATS =================
// router.get("/stats", async (req, res) => {
//   try {
//     const totalProducts = await Product.countDocuments();
//     const activeCategories = await Category.countDocuments();
//     const bestsellers = await Product.countDocuments({ isBestseller: true });

//     const stockAgg = await Product.aggregate([
//       { $group: { _id: null, total: { $sum: "$stock" } } },
//     ]);

//     const totalStock = stockAgg[0]?.total || 0;

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
// router.get("/stats", async (req, res) => {
//   try {
//     const totalProducts = await Product.countDocuments();
//     const activeCategories = await Category.countDocuments();
//     const bestsellers = await Product.countDocuments({ isBestseller: true });

//     const totalUsers = await User.countDocuments({ role: "user" }); // 👈 USERS

//     const stockAgg = await Product.aggregate([
//       { $group: { _id: null, total: { $sum: "$stock" } } },
//     ]);
//     const totalStock = stockAgg[0]?.total || 0;

//     res.json({
//       totalProducts,
//       activeCategories,
//       bestsellers,
//       totalStock,
//       totalUsers, // 👈 SEND TO FRONTEND
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Stats fetch failed" });
//   }
// });
router.get("/stats", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const activeCategories = await Category.countDocuments();
    const bestsellers = await Product.countDocuments({ isBestseller: true });
    const totalUsers = await User.countDocuments({ role: "user" });

    // 🔥 VARIANT STOCK SUM
    const stockAgg = await Product.aggregate([
      { $unwind: "$variants" },
      {
        $group: {
          _id: null,
          totalStock: { $sum: "$variants.stock" },
        },
      },
    ]);

    const totalStock = stockAgg[0]?.totalStock || 0;

    res.json({
      totalProducts,
      activeCategories,
      bestsellers,
      totalUsers,
      totalStock,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Stats fetch failed" });
  }
});


// GET ALL CATEGORIES
router.get("/categories", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// ✅ CREATE CATEGORY
router.post("/categories", async (req, res) => {
  try {
    const category = new Category({
      title: req.body.title,
      description: req.body.description,
    });

    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: "Create category failed" });
  }
});
// ✅ UPDATE CATEGORY
router.put("/categories/:id", async (req, res) => {
  try {
    await Category.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description,
    });

    res.json({ message: "Category updated" });
  } catch (err) {
    res.status(500).json({ message: "Update category failed" });
  }
});


// CREATE CATEGORY main
// router.post("/product", async (req, res) => {
//   try {
//     const product = new Product({
//       ...req.body,

//       // 🔒 FORCE BOOLEAN
//       sugarFree: Boolean(req.body.sugarFree),
//       sprouted: Boolean(req.body.sprouted),
//       isBestseller: Boolean(req.body.isBestseller),
//     });

//     await product.save();
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: "Create failed" });
//   }
// });


// router.put("/product/:id", async (req, res) => {
//   await Product.findByIdAndUpdate(req.params.id, {
//     ...req.body,
//     sugarFree: Boolean(req.body.sugarFree),
//     sprouted: Boolean(req.body.sprouted),
//     isBestseller: Boolean(req.body.isBestseller),
//   });

//   res.json({ message: "Updated" });
// });
// 

// DELETE CATEGORY
router.delete("/category/:id", async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted" });
});


/* ================= PRODUCTS ================= */


// GET ALL PRODUCTS  🔥 (THIS IS WHAT YOUR FRONTEND NEEDS)
// main
// router.get("/products", async (req, res) => {
//   res.json(await Product.find());
// });

// router.post("/product", async (req, res) => {
//   const product = new Product(req.body);
//   await product.save();
//   res.json(product);
// });
// // ✅ UPDATE PRODUCT
// router.put("/product/:id", async (req, res) => {
//   await Product.findByIdAndUpdate(req.params.id, req.body);
//   res.json({ message: "Product updated" });
// });

// router.delete("/product/:id", async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ message: "Product deleted" });
// });

// ✅ GET ALL PRODUCTS
router.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ✅ CREATE PRODUCT (FILE UPLOAD) post1
// router.post("/product", upload.single("image"), async (req, res) => {
//   try {
//     console.log("BODY 👉", req.body);
//     console.log("FILE 👉", req.file);

//     const product = new Product({
//       title: req.body.title,
//       category: req.body.category,
//       description: req.body.description,
//       price: Number(req.body.price),
//       stock: Number(req.body.stock),
//       sugarFree: req.body.sugarFree === "true",
//       sprouted: req.body.sprouted === "true",
//       isBestseller: req.body.isBestseller === "true",
//       image: req.file ? `/uploads/${req.file.filename}` : "",
//     });

//     await product.save();

//     res.status(201).json(product);
//   } catch (err) {
//     console.error("❌ CREATE PRODUCT ERROR:", err);
//     res.status(500).json({
//       message: "Create product failed",
//       error: err.message,
//     });
//   }
// });
router.post("/product", upload.single("image"), async (req, res) => {
  try {
    const variants = JSON.parse(req.body.variants || "[]");

    if (!variants.length) {
      return res.status(400).json({ message: "Variants required" });
    }

    const product = new Product({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      variants,
      sugarFree: req.body.sugarFree === "true",
      sprouted: req.body.sprouted === "true",
      isBestseller: req.body.isBestseller === "true",
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("CREATE PRODUCT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});



// ✅ UPDATE PRODUCT put1
// router.put(
//   "/product/:id",
//   upload.single("image"),
//   async (req, res) => {
//     const updateData = {
//       ...req.body,
//       sugarFree: req.body.sugarFree === "true",
//       sprouted: req.body.sprouted === "true",
//       isBestseller: req.body.isBestseller === "true",
//     };

//     if (req.file) {
//       updateData.image = `/uploads/${req.file.filename}`;
//     }

//     await Product.findByIdAndUpdate(req.params.id, updateData);
//     res.json({ message: "Updated" });
//   }
// );
router.put("/product/:id", upload.single("image"), async (req, res) => {
  const updateData = {
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    variants: JSON.parse(req.body.variants || "[]"),
    sugarFree: req.body.sugarFree === "true",
    sprouted: req.body.sprouted === "true",
    isBestseller: req.body.isBestseller === "true",
  };

  if (req.file) {
    updateData.image = `/uploads/${req.file.filename}`;
  }

  await Product.findByIdAndUpdate(req.params.id, updateData);
  res.json({ message: "Updated" });
});

// ✅ DELETE PRODUCT
router.delete("/product/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});
const User = require("../models/User");

// ✅ GET ALL CUSTOMERS
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Users fetch failed" });
  }
});
// /* GET ALL PRODUCTS */
// router.get("/products", async (req, res) => {
//   const products = await Product.find();

//   const normalized = products.map((p) => ({
//     ...p._doc,

//     // 🔥 MAP OLD → NEW
//     isSugarFree: p.isSugarFree ?? p.sugarFree ?? false,
//     isSprouted: p.isSprouted ?? p.sprouted ?? false,
//     isBestseller: p.isBestseller ?? false,
//   }));

//   res.json(normalized);
// });




// /* CREATE PRODUCT */
// router.post("/product", async (req, res) => {
//   console.log("REQ BODY 👉", req.body); // 🔥 MUST SEE THIS

//   const product = new Product(req.body);
//   await product.save();
//   res.json(product);
// });



// /* UPDATE PRODUCT */
// router.put("/product/:id", async (req, res) => {
//   await Product.findByIdAndUpdate(req.params.id, req.body);
//   res.json({ message: "Updated" });
// });

// /* DELETE PRODUCT */
// router.delete("/product/:id", async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// });

module.exports = router;
