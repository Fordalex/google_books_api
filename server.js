const express = require("express");
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// init middleware
// Get the data in the req.body in users.js
app.use(express.json({ extended: false }))

// Define Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));

app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
