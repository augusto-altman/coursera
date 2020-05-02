const { createServer } = require("http");
const path = require("path");

const requestListener = function (req, res) {
  console.log("Request for " + req.url + " by method " + req.method);
  console.log(
    "path.resolve('./public' + req.url)",
    path.resolve("./public" + req.url)
  );
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("Hello, World!");
};

const server = createServer(requestListener);
server.listen(8080, "localhost", () => {
  console.log("Server starter at 8080");
});
