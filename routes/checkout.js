const express = require('express');
const router = express.Router();
const stripe = require("stripe")("sk_test_cVixdDOqymfQhjyDEMVFeKQg00zpmzUPXB");
const { isLoggedIn, isNotLoggedIn, validationLoggin } = require('../helpers/middlewares');

router.post('/', isLoggedIn, async (req, res, next) => {
  const {amount, token} = req.body;
  const charge = await stripe.charges.create({
    amount,
    currency: 'eur',
    description: 'Participación por el coche',
    source: token
  });
  res.json(charge);
  res.status(200);
});


module.exports = router;