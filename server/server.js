const express = require("express");
const jsonServer = require("json-server");
const path = require("path");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema.js");
const cors = require("cors");
const app = express();

const router = jsonServer.router("data.json");
const middlewares = jsonServer.defaults();

// const app = jsonServer.create();

const port = process.env.PORT || 4000;
const publicPath = path.join(__dirname, "..", "client", "build");

app.use(router);
app.use(middlewares);
app.use(cors());
app.use(express.static(publicPath));

app.use(
  "/api/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.use(express.static(publicPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
