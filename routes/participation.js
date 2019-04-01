const express = require('express');
const router = express.Router();

const Participation = require('../models/Participation');

router.get('/', (req, res, next) => {
  const { _id } = req.session.currentUser;

  Participation.find({ idUser: _id }).populate('idCar')
    .then((participation) => {
      return res.json(participation);
    })
});

router.post('/create', (req, res, next) => {
  const { idCar, numParticipations } = req.body;
  const { _id } = req.session.currentUser;
  console.log(_id);
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

router.post('/delete', (req, res, next) => {
  console.log('delete');
  const { _id } = req.body;
  console.log(Participation.findByIdAndDelete(_id));
  Participation.findByIdAndDelete(_id)
    .then(() => {
      return res.status(204).send();
    })
});

router.put('/', (req, res, next) => {
  const { _id, position } = req.body;
  let arrayPosition = [];
  Participation.findById(_id)
    .then((result) => {
      arrayPosition = result.position
      arrayPosition.push(position);
      return Participation.findByIdAndUpdate(_id, { position: arrayPosition }, { new: true })
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