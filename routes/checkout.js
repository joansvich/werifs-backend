const express = require('express');
const router = express.Router();
const stripe = require("stripe")("sk_test_cVixdDOqymfQhjyDEMVFeKQg00zpmzUPXB");
const { isLoggedIn, isNotLoggedIn, validationLoggin } = require('../helpers/middlewares');
const Participation = require('../models/Participation');

router.post('/', isLoggedIn(), async (req, res, next) => {
  try {
    const { amount, token, listParticipation } = req.body;
    const charge = await stripe.charges.create({
      amount,
      currency: 'eur',
      description: 'Participación por el coche',
      source: token
    });
    if (charge.status === "succeeded") {
      listParticipation.map((participation) => {
        const { _id } = participation
        if (participation.position.length > 0) {
          Participation.findByIdAndUpdate(_id, { paid: true }, { new: true })
            .then((part) => console.log(part))
            .catch(next)
        }

      })
    }
    res.json(charge);
    res.status(200);


    return charge;
  } catch (error) {

    res.json(error);
    res.status(400);
    return error;
  }

});


module.exports = router;