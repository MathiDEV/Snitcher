const express = require('express');
const router = express.Router();
const login = require("./login/login");
const user = require("./user/routes");
const json = require('./json/json');
const automations = require("./automations/routes");

router.use('/user', user);
router.use('/automations', automations);

router.post('/auth', (req, res) => {
  login.login(req, res);
});

router.post('/webhooks/:id', (req, res) => {
  json.parse_and_execute(req, res);
});


module.exports = router;