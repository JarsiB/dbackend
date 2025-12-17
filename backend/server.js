// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const authRoutes = require("./routes/auth"); // make sure this file exists
// const adminRoutes = require("./routes/admin");
// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/admin", require("./routes/admin"));
// app.use("/api/admin", adminRoutes);

// const PORT = process.env.PORT || 5000;
// const MONGO_URI =
//   process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mern_auth";

// async function start() {
//   try {
//     // NOTE: do NOT pass legacy options like useNewUrlParser/useUnifiedTopology with Mongoose v7+
//     await mongoose.connect(MONGO_URI);
//     console.log("✅ MongoDB connected");
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   } catch (err) {
//     console.error("MongoDB connection error", err);
//     // optional: exit so nodemon doesn't think everything is fine
//     // process.exit(1);
//   }
// }

// start();




// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const authRoutes = require("./routes/auth");
// const adminRoutes = require("./routes/admin"); // ✅ ONE TIME ONLY

// const app = express();

// app.use(cors());
// app.use(express.json());

// // ROUTES
// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes); // ✅ ONLY THIS

// const PORT = process.env.PORT || 5000;
// const MONGO_URI =
//   process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mern_auth";
// // const MONGO_URI = process.env.MONGO_URI;

// async function start() {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log("✅ MongoDB connected");
//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   } catch (err) {
//     console.error("MongoDB connection error", err);
//   }
// }

// start();

// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const authRoutes = require("./routes/auth");
// const adminRoutes = require("./routes/admin");

// const app = express();

// /* ✅ CORS – frontend localhost */
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

// app.use(express.json());

// /* ROUTES */
// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes);

// const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB connected");
//     app.listen(PORT, () =>
//       console.log(`🚀 Backend running on http://localhost:${PORT}`)
//     );
//   })
//   .catch((err) => console.error("Mongo error", err));



// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const authRoutes = require("./routes/auth");
// const adminRoutes = require("./routes/admin"); // ✅ ONE TIME ONLY

// const app = express();

// // app.use(cors());
// app.use(express.json());

// // ROUTES
// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes); // ✅ ONLY THIS

// const PORT = process.env.PORT || 5000;
// const MONGO_URI =
//   process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mern_auth";
// // const MONGO_URI = process.env.MONGO_URI;
// // const cors = require("cors");

// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "https://dsaki2.vercel.app",
//     ],
//     credentials: true,
//   })
// );

// async function start() {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log("✅ MongoDB connected");
//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   } catch (err) {
//     console.error("MongoDB connection error", err);
//   }
// }

// start();














// main
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

const app = express();

/* ================= CORS (MUST BE FIRST) ================= */

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3004",
  "frontend-9ckq.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ================= MIDDLEWARE ================= */
app.use(express.json());

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

/* ================= CONFIG ================= */
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mern_auth";

/* ================= START SERVER ================= */
async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ MongoDB connection error", err);
  }
}

start();
