const express = require("express");
var jsonServer = require('json-server');
const path = require("path");

const app = express();

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "..", "client", "build");

app.use(express.static(publicPath));
app.use('/api', jsonServer.router('data.json'));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
