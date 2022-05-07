const express = require('express');
const router = express.Router();
const database = require('../config/database');
const {check_user} = require("./login");

router.post('/user', (req, res) => {
  check_user(req, res);
});

router.post('/auth', (req, res) => {

});

module.exports = router;