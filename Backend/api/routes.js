const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const login = require("./login");
const user = require("./user");

router.post('/user', (req, res) => {
  login.check_user(req, res);
});

router.post('/auth', (req, res) => {
  login.login(req, res);
});

router.get('/user/changeUsername',auth, (req, res) => {
  user.changeUsername(req, res);
});

module.exports = router;