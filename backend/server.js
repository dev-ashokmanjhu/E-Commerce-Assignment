const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("Server is Running");
});
app.listen("4000", () => {
  console.log("server is Running");
});
