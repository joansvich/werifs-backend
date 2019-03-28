const express = require('express');
const router = express.Router();

const Participation = require('../models/Participation');

router.get('/', (req, res, next) => {
  Participation.find().populate('idCar')
    .then((participation) => {
      console.log(participation)
      return res.json(participation);
    })
});

router.post('/create', (req, res, next) => {
  const { idCar, numParticipations } = req.body;
  const { _id } = req.session.currentUser;
  const newParticipation = new Participation({
    idUser:_id,
    idCar,
    numParticipations
  });
  return newParticipation.save()
    .then(() => {
      res.status(200).json(newParticipation);
    });

});

module.exports = router;