/** @format */

const express = require("express");
const ItemModel1 = require("../models/itemsModel");
const router = express.Router();

router.get("/get-all-items", async (req, res) => {
 try {
  const items = await ItemModel1.find();
  res.send(items);
 } catch (error) {
  res.status(400).json(error);
 }
});
router.post("/add-item", async (req, res) => {
 try {
  const newitems = new ItemModel1(req.body);
  await newitems.save();
  res.send("Item Added successfully");
 } catch (error) {
  res.status(400).json(error);
 }
});
router.post("/edit-item", async (req, res) => {
 try {
  await ItemModel1.findOneAndUpdate({ _id: req.body.itemId }, req.body);
  res.send("Item updated successfully");
 } catch (error) {
  res.status(400).json(error);
 }
});

module.exports = router;
