const express = require("express");
const path = require("path");
const cors = require("cors");
const { default: axios } = require("axios");
const app = express();

const publicPath = path.join(__dirname, "..", "client", "build");
const port = process.env.PORT || 3000;
const apiUrl = "https://hh-json-server.herokuapp.com/colors/";

app.use(cors());
app.use(express.json());

// get all colors
app.get("/api/colors", async (req, res) => {
  try {
    const { data: colors } = await axios.get(apiUrl);

    res.send(colors);
  } catch (error) {
    console.error("Error on get /api/colors", error);
    res.status(500).send(error);
  }
});

// delete all colors
app.delete("/api/colors", async (req, res) => {
  try {
    const { data: colors } = await axios.get(apiUrl);

    const apiCalls = [];

    colors.forEach((color) => {
      apiCalls.push(axios.delete(apiUrl + color.id));
    });

    await Promise.all(apiCalls);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error on delete /api/colors", error);
    res.status(500).send(error);
  }
});

app.use(express.static(publicPath));

app.get("/*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
