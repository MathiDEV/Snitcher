const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const login = require("./login/login");
const user = require("./user/user");
const discord = require("./automations/discord");
const telegram = require("./automations/telegram");

router.post('/auth', (req, res) => {
  console.log(req.body);
  login.login(req, res);
});

router.post('/user', (req, res) => {
  console.log(req.body);
  login.check_user(req, res);
});

router.post('/user/changeUsername',auth, (req, res) => {
  console.log(req.body);
  user.changeUsername(req, res);
});

router.post('/automations/discord', (req, res) => {
  discord.sendMessage(req.body.url, req.body.from, req.body.to, req.body.amount, req.body.currency);
  res.send("Message sent");
});

router.post('/automations/telegram', (req, res) => {
  telegram.sendMessage(req.body.id, req.body.from, req.body.to, req.body.amount, req.body.currency);
  res.send("Message sent");
});

module.exports = router;