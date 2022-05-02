const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults({
  static: "./build",
});

const port = process.env.PORT || 3002;
const publicPath = path.join(__dirname, "..", "client", "build");

server.use(middlewares);
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);
server.use(router);

server.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

server.listen(port, () => {
  console.log("Server is running");
});
