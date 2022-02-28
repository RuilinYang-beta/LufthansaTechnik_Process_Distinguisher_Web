const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    tempKey: String,
  },
  {
    strict: false,
  }
);

module.exports = mongoose.model("Result", resultSchema);
