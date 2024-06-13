/** @format */

const express = require("express");
const dbConnect = require("./dbConnect");

const app = express();
app.use(express.json());
const itemsRoute = require("./routes/itemsRoute");
app.use("/api/items/", itemsRoute);
const port = 5000;

app.get("s", (req, res) => res.send("Hello World!"));

dbConnect.on("connected", () => {
 app.listen(port, () => {
  console.log(`Node.js Server Running at http://localhost:${port}`);
 });
});

dbConnect.on("error", (err) => {
 console.error("MongoDB Connection Error:", err);
});
