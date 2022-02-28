const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const {
  templates,
  phases,
  templateTaskCounts,
  templateNames,
} = require("./model/templates");
const { getPhaseCenteredTemplates } = require("./utils");
const Result = require("./db/Result");

const util = require("util");

const app = express();
const PORT = 3000;
const URI =
  "mongodb+srv://admin:1234@cluster0.uomoj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client")));

// ------ request related to templates ------
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

// ------ request related to results ------
app.post("/api/result", (req, res) => {
  // _logObj(req.body);
  _saveToDB(req.body);
  res.send("reply from server");
});

app.get("/api/results", async (req, res) => {
  const all = await Result.find({});
  console.log(all);
  res.send(JSON.stringify(all));
  // console.log(JSON.stringify(_getAllFromDB()));
  // res.send(JSON.stringify(_getAllFromDB()));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

const _saveToDB = async (data) => {
  try {
    await Result.create(data);
  } catch (e) {
    console.log(`Error in _saveToDB: ${e.message}`);
  }
};

// return all from DB
const _getAllFromDB = async () => {
  const all = await Result.find({});
  // console.log("======");
  // console.log(all);
  // console.log(typeof all);
  // console.log("======");
  return all;
};

const _logObj = (obj) => {
  console.log(
    util.inspect(obj, {
      showHidden: false,
      depth: null,
      colors: true,
    })
  );
};
