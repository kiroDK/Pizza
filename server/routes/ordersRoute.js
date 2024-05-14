const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");

dotenv.config();
const stripe = require("stripe")(process.env.Secret_key);
const Order = require("../models/orderModel");

router.post("/placeorder", async (req, res) => {
  const { token, subtotal, currentUser, cartItems } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    // const paymentMethod = await stripe.paymentMethods.attach(token.id, {
    //   customer: customer.id,
    // });

    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: subtotal * 100,
        currency: "inr",
        customer: customer.id,
        // payment_method: paymentMethod.id,
        receipt_email: token.email,
        // confirm: true,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (paymentIntent) {
      const neworder = new Order({
        name: currentUser.name,
        email: currentUser.email,
        userid: currentUser._id,
        orderItems: cartItems,
        orderAmount: subtotal,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          pincode: token.card.address_zip,
        },
        // transactionID: paymentIntent.source.id
        // transactionId: paymentIntent.payment_method,

        // transactionId: token.card.id,
        transactionId: paymentIntent.id,
      });

      neworder.save();

      res.send("Order placed successfully");
    } else {
      res.send("Payment Failed");
    }
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" + error });
  }
});

router.post("/getuserorders", async (req, res) => {
  const { userid } = req.body;
  try {
    const orders = await Order.find({ userid: userid }).sort({ _id: -1 });
    console.log(orders);
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

module.exports = router;
