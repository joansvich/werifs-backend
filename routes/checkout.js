const express = require('express');
const router = express.Router();
const stripe = require("stripe")("sk_test_cVixdDOqymfQhjyDEMVFeKQg00zpmzUPXB");
const { isLoggedIn, isNotLoggedIn, validationLoggin } = require('../helpers/middlewares');



router.post('/', isLoggedIn(), async (req, res, next) => {
  try {
    console.log("checkout backend")
    const { amount, token } = req.body;
    const charge = await stripe.charges.create({
      amount,
      currency: 'eur',
      description: 'Participación por el coche',
      source: token
    });
    res.json(charge);
    res.status(200);
    console.log("checkout done")

    return charge;
  } catch (error) {
    console.log("checkout error")

    res.json(error);
    res.status(400);
    return error;
  }

});


module.exports = router;