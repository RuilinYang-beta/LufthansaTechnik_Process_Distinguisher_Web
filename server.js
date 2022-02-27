const express = require("express");
const path = require("path");
const {
  templates,
  phases,
  templateTaskCounts,
  templateNames,
} = require("./model/templates");
const { getPhaseCenteredTemplates } = require("./utils");

const util = require("util");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "client")));

app.get("/api/templates", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(getPhaseCenteredTemplates(templates, phases)));
});

app.get("/api/phases", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(phases));
});

app.get("/api/templateTaskCounts", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(templateTaskCounts));
});

app.get("/api/templateNames", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(templateNames));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.get("/api/data", (req, res) => {});

const phaseCenteredTemplates = getPhaseCenteredTemplates(templates, phases);
// console.log(
//   util.inspect(phaseCenteredTemplates, {
//     showHidden: false,
//     depth: null,
//     colors: true,
//   })
// );
