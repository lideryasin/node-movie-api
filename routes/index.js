var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res, next) => {
  const { username, password } = req.body

  bcrypt.hash(password, 10).then((hash) => {
    const user = new Users({
      username,
      password: hash
    })

    const promise = user.save();
    promise.then(data => {
      res.json(data);
    }).catch(err => {
      res.json(err)
    })
  })
});

router.post('/login', (req, res) => {
  const { username, password } = req.body

  Users.findOne({
    username
  }, (err, user) => {
    if (err)
      throw err

    if (!user) {
      res.json({
        status: false,
        message: 'Authentication failed, user not found.'
      });
    } else {
      bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
          res.json({
            status: false,
            message: 'Authentication failed, worng password.'
          })
        } else {
          const payload = {
            username
          }
          const token = jwt.sign(payload, req.app.get('api_secret_key'),{
            expiresIn: 1000
          })
          res.json({
            status: true,
            token
          })
        }
      });
    }
  })
})

module.exports = router;
