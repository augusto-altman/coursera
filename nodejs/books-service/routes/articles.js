const express = require("express");
const db = require("../db/xmlDB");

const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const allArticles = await db.getAllArticles();
    res.send(allArticles);
  } catch (e) {
    res.status(500).send("Something went wrong", e);
  }
});

module.exports = router;
