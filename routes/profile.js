const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.put('/', (req, res, next) => {
  const { username, adress, phone, email, imageUrl } = req.body;
  const { _id } = req.session.currentUser;
  let updateUser = {
    username,
    adress,
    phone,
    email
  }

  return User.findByIdAndUpdate(_id, updateUser, { new: true })
    .then((user) => {
      req.session.currentUser = user;
      res.json(user);
      res.status(200);
    })
    .catch((err)=>{
      res.json(err);
      res.status(500);
    })
});


module.exports = router;