const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const protect = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");


// ✅ Load environment variables
dotenv.config();

// ✅ Import and call DB connection BEFORE anything else
const connectDB = require("./config/db");
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
// Auth routes

app.use("/api/auth", authRoutes);

// ✅ PROTECTED ROUTE for testing JWT
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: `Welcome, ${req.user.name}. You are authorized.`,
    user: req.user,
  });
});

const itemRoutes = require("./routes/itemRoutes");
app.use("/api/items", itemRoutes);



app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
