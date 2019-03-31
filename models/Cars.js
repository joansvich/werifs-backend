'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  power: {
    type: String,
    required: true
  },
  retailPrice: {
    type: String,
    required: true
  },
  velocity: {
    type: String,
    required: true
  },
  torque: {
    type: String,
    required: true
  },
  contamination: {
    type: String,
    required: true
  },
  drivetrain: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
    default: './images/sample-car.jpg'
  },
  price1: {
    type: String,
    required: true,
    default: "2"
  },
  price5: {
    type: String,
    required: true,
    default: "1.90"
  },
  price10: {
    type: String,
    required: true,
    default: "1.80"
  }  
});

const Cars = mongoose.model('Cars', carsSchema);

module.exports = Cars;
