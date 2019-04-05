const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

const { isLoggedIn, isNotLoggedIn, validationLoggin } = require('../helpers/middlewares');

router.get('/me', isLoggedIn(), (req, res, next) => {
  res.json(req.session.currentUser);
});

router.post('/login', isNotLoggedIn(), validationLoggin(), (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({
    username
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: true,
          code: "El usuario no existe"
        })
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        console.log(req.session.currentUser);
        return res.status(200).json(user);
      } else {
        return res.status(401).json({
          error: true,
          code: "La contraseña no es correcta"
        })
      }
    })
    .catch(next);
});

router.post('/signup', isNotLoggedIn(), validationLoggin(), (req, res, next) => {
  const { username, password, adress, phone, email } = req.body;

  User.findOne({
    username
  }, 'username')
    .then((userExists) => {
      if (userExists) {
        return res.status(422).json({
          error: true,
          code: "Ya existe un usuario con este nombre"
        })
      } else {

        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);

        const newUser = new User({
          username,
          password: hashPass,
          adress,
          phone,
          email
        });

        return newUser.save().then(() => {
          // TODO delete password 
          req.session.currentUser = newUser;
          res.status(200).json(newUser);
        });
      }
    })
    .catch(next);
});

router.post('/logout', isLoggedIn(), (req, res, next) => {
  req.session.destroy();
  return res.status(204).send();
});

router.get('/private', isLoggedIn(), (req, res, next) => {
  res.status(200).json({
    message: 'This is a private message'
  });
});

module.exports = router;
