'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const participationSchema = new Schema({
  idUser: {
    type: ObjectId,
    ref: 'User'
  },
  idCar: {
    type: ObjectId,
    ref: 'Cars'
  },
  amount: {
    type: Number,
    default: 0
  },
  position: [{
    type: String,
    default: '0'
  }],
  paid: {
    type: Boolean,
    default: false
  }
});

const Participation = mongoose.model('Participation', participationSchema);

module.exports = Participation;