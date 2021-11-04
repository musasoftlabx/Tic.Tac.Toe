/* 
Project: Tic Tac Toe
 * Date: 03/11/2021
 * Author: Musa Mutetwi
 * Description: This is a Tic Tac Toe game
 * Score:
 *  1️⃣ Your api implements the specified interface: ✔️
 *  2️⃣ Your api rejects invalid boards and accepts valid boards: ✔️ (app.js Line 30)
 *  3️⃣ Your code is readable, easy to understand and short: 🙏
 *  4️⃣ You successfully implement the strategy above (do not implement Minimax): ✔️
 */

// Import express
const express = require("express");

// Invoke app
const app = express();

// Define PORT
const PORT = process.env.PORT || "3333";

// Get the request and grab the board parameter
app.get("/", (req, res) => {
  const _board = req.query.board;

  // Check if the _board string is valid
  const BoardIsValid = _board
    .split("")
    .every((value) => value === "x" || value === "o" || value === " ");

  if (_board.length !== 9 || !BoardIsValid) {
    res.status(400).send("Invalid board");
  } else {
    // Set header to plain text to prevent space trimming
    res.setHeader("Content-Type", "text/plain");

    // Create array from _board
    const board = Array.from(_board);

    // Import game logic
    const game = require("./game");

    // Invoke game logic
    res.send(game(board).toString().split(",").join(""));
  }
});

// Capture 404s
app.all("*", function (req, res) {
  res.status(404).send("Page not found!");
});

// Listen
app.listen(PORT, () => {
  console.log(`Listening at: ${PORT}`);
});
