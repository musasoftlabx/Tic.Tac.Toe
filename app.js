// Import libraries
const express = require("express");
const cors = require("cors");

// Invoke app
const app = express();

// Define PORT
const PORT = process.env.PORT || "3333";

// Listen
app.listen(PORT, () => {
  console.log(`Listening at: ${PORT}`);
});

// Register Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Auto-process
app.get("/", (req, res) => {
  res.send("req");
});
