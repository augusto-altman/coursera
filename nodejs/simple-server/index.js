const express = require("express");
const coursesApi = require("./routes/courses");
const homeApi = require("./routes/home");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/courses", coursesApi);
app.use("/", homeApi);

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
