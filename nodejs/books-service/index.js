const express = require("express");
const articlesRoutes = require("./routes/articles");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/articles", articlesRoutes);

app.get("/", (req, res) => res.status(403).send("Forbidden"));

app.listen(port, () =>
  console.log(`Books service listening at http://localhost:${port}`)
);
