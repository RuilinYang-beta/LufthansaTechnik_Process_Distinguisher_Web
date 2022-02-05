const express = require("express");
const path = require("path");
const { templates, phases } = require("./model/templates");
const { getPhaseCenteredTemplates } = require("./utils");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "client")));

app.get("/api/templates", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  // res.send(JSON.stringify(templates));
  res.send(JSON.stringify(getPhaseCenteredTemplates(templates, phases)));
});

app.get("/api/phases", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(phases));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.get("/api/data", (req, res) => {});
