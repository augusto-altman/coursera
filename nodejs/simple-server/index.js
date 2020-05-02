const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/courses", (req, res) => {
  res.send([23, 4, 55]);
});

app.listen(8080, () => {
  console.log("server started");
});
