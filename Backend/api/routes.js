const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const login = require("./login/login");
const user = require("./user/user");
const discord = require("./automations/discord");
const telegram = require("./automations/telegram");
const twilio = require("./automations/twilio");

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

router.get('/user/bestusers', auth, (req, res) => {
    console.log(req.body);
    bestUsers.bestUsers(req, res);
  });


router.post('/automations/discord', (req, res) => {
  discord.sendMessage(req.body.url, req.body.from, req.body.to, req.body.amount, req.body.currency);
  res.send("Message sent");
});

router.post('/automations/telegram', (req, res) => {
  telegram.sendMessage(req.body.id, req.body.from, req.body.to, req.body.amount, req.body.currency);
  res.send("Message sent");
});

router.post('/automations/create/:type/:action?', auth, (req, res) => {
  console.log(req.params);
  if (req.params.type === "twilio") {
    if (req.params.action === "call")
      return res.status(200).json(twilio.create_twilio_json(req.body.title, req.body.number, "call", req.id));
    if (req.params.action === "text")
      return res.status(200).json(twilio.create_twilio_json(req.body.title, req.body.number, "text", req.id));
  }
  if (req.params.type === "discord")
    return res.status(200).json(discord.create_discord_json(req.body.title, req.body.url, req.id));
});

module.exports = router;