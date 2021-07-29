const express = require("express");
const path = require("path");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "public", "index.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "public", "register.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "public", "login.html"));
});

module.exports = app;
