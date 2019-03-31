const express = require('express');
const router = express.Router();

const Cars = require('../models/Cars');

router.get('/',  (req, res, next) => {
  Cars.find()
    .then((cars) => {
      return res.json(cars);
    })
});

router.post('/create', (req, res, next) => {
  const { name, power, retailPrice, velocity, torque, contamination, drivetrain, imageUrl, price1, price5, price10 } = req.body;

  Cars.findOne({
      name
    }, 'name')
    .then((carExists) => {
      if (carExists) {
        const err = new Error('Car exists');
        err.status = 422;
        err.statusMessage = 'cars-name-not-unique';
        next(err);
      }

      const newCar = new Cars({
        name,
        power,
        retailPrice,
        velocity,
        torque,
        contamination,
        drivetrain, 
        imageUrl,
        price1,
        price5,
        price10
      });

      return newCar.save().then(() => {
        res.status(200).json(newCar);
      });
    })
    .catch(next);
});

module.exports = router;