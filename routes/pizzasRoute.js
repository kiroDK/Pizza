const express = require("express");
const router = express.Router();
const Pizza = require("../models/pizzaModel");

router.get("/getallpizzas", async (req, res) => {
  try {
    const pizzas = await Pizza.find({});
    res.send(pizzas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
