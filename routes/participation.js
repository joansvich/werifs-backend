const express = require('express');
const router = express.Router();

const Participation = require('../models/Participation');
const { isLoggedIn } = require('../helpers/middlewares');


router.get('/', isLoggedIn(), (req, res, next) => {
  const { _id } = req.session.currentUser;
  Participation.find({ idUser: _id }).populate('idCar')
    .then((participation) => {
      return res.status(200).json(participation);
    })
});


router.post('/create', isLoggedIn(), (req, res, next) => {
  const { idCar, numParticipations } = req.body;
  const { _id } = req.session.currentUser;
  const newParticipation = new Participation({
    idUser: _id,
    idCar,
    numParticipations
  });
  return newParticipation.save()
    .then(() => {
      res.status(200).json(newParticipation);
    });
});

router.post('/delete', isLoggedIn(), (req, res, next) => {
  const { _id } = req.body;
  Participation.findByIdAndDelete(_id)
    .then(() => {
      return res.status(204).send();
    })
});


router.put('/', isLoggedIn(), (req, res, next) => {
  const { _id, position } = req.body;
  let arrayPosition = [];
  Participation.findById(_id).populate('idCar')
    .then((participations) => {
      arrayPosition = participations.position
      arrayPosition.push(position);
      const { price1, price5, price10 } = participations.idCar;
      const totalPositions = arrayPosition.length;
      let totalAmount = 0;
      if (totalPositions < 5) {
        totalAmount = price1 * totalPositions;

      } else if (totalPositions < 10) {
        totalAmount = price5 * totalPositions;
      } else {
        totalAmount = price10 * totalPositions;
      }
      const roundAmount = Math.round(totalAmount * 100) / 100;
      return Participation.findByIdAndUpdate(_id, { position: arrayPosition, amount: roundAmount }, { new: true }).populate('idCar')
        .then((participation) => {
          res.json(participation);
          res.status(200);
        })
        .catch((err) => {
          res.json(err);
          res.status(500);
        })
    })
});

module.exports = router;