const mongoose = require("mongoose");

const cbpbuSchema = new mongoose.Schema({
  title: String,
  date: String,
  link: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  "cbpbu",
  cbpbuSchema
);