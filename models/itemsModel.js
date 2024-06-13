/** @format */

const mongoose = require("mongoose");

const itemsSchema = mongoose.Schema(
 {
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
 },
 { timestamps: true } //timestamps is used to add the created of item in database and its updated info
);

const itemsModel = mongoose.model("items", itemsSchema);
module.exports = itemsModel;
