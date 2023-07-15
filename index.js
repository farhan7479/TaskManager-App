const express = require("express");
require("colors");
require("dotenv").config();
const morgan = require("morgan");
const connectDB = require("./config/db.js");
const cors = require("cors");
const authRoutes = require("./routes/auth.js");
const tasksRoutes = require('./routes/taskRoute.js');

// Configure database connection
connectDB();

const app = express();

// Middleware
const corsOptions = {
  origin: "https://salmon-pilot-ylsby.pwskills.app:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRoutes);

app.use('/api/v1/tasks', tasksRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the ecommerce app</h1>");
});

// Set the port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
