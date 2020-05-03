const express = require("express");
const coursesApi = require("./routes/courses");
const homeApi = require("./routes/home");

const app = express();
const port = process.env.PORT || 8080;

const foo = { id: 1, name: "uno", opt: 22 };
const bar = { id: 2, name: "dos", josh: 1 };

console.table([foo, bar]);

app.use(express.json());
app.use("/api/courses", coursesApi);
app.use("/", homeApi);

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
