const express = require("express");
const db = require("./config/db");
const router = require("./routes/profileRoutes");
const logger = require("morgan");
const deletealluser = require("./test/delete");
const app = express();
app.use(logger("dev"));
app.use(express.json());
require("dotenv").config({
  path: "./env/config.env",
});

app.get("/", (req, res) => {
  res.send("<h1>hello world</h1>");
});

app.use("/api/v1/users", router);

app.use((err, req, res, next) => {
  const message = err.message ? err.message : "this error is from server.js";
  const status = err.status ? err.status : 500;
  res.status(status).json({
    message: message,
  });
});
app.listen(process.env.PORT, () => {
  db();
});
