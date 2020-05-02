const { createServer } = require("http");

const requestListener = function (req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("Hello, World!");
};

const server = createServer(requestListener);
server.listen(8080, "localhost", () => {
  console.log("Server starter at 8080");
});
