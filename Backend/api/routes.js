const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const login = require("./login/login");
const user = require("./user/user");
const bestUsers = require("./user/bestUsers");
const discord = require("./automations/discord");
const telegram = require("./automations/telegram");
const twilio = require("./automations/twilio");
const starton = require("./starton/api");
const json = require('./json/json');

router.post('/auth', (req, res) => {
  login.login(req, res);
});

router.post('/user', (req, res) => {
  login.check_user(req, res);
});

router.post('/user/changeUsername',auth, (req, res) => {
  user.changeUsername(req, res);
});

router.get('/user/bestusers', auth, (req, res) => {
    bestUsers.bestUsers(req, res);
  });


router.post('/automations/discord', (req, res) => {
  discord.sendMessage(req.body.url, req.body.from, req.body.to, req.body.amount, req.body.currency);
  res.status(200).json({ success: "Message sent"} );
});

router.post('/automations/telegram', (req, res) => {
  telegram.sendMessage(req.body.id, req.body.from, req.body.to, req.body.amount, req.body.currency);
  res.status(200).json({ success: "Message sent"} );
});

router.post('/webhooks/:id', (req, res) => {
  json.parse_and_execute(req, res);
});

router.post('/automations/create/:type/:action?', auth, (req, res) => {
  if (req.params.type !== "discord" && req.params.type !== 'telegram' && req.params.type !== 'twilio')
    return res.status(403).send("Invalid type");

  let options;

  if (req.params.type === "twilio") {
    if (req.params.action !== "call" || req.params.action !== "text")
      return res.status(403).send("Invalid action");
    if (!req.body.title || !req.body.number)
      return res.status(403).send("Missing parameters");
    options = twilio.create_twilio_json(req.body.title, req.body.number, req.params.action, req.id);
  }
  if (req.params.type === "discord")
    if (!req.body.title || !req.body.url)
      return res.status(403).send("Missing parameters");
    options = discord.create_discord_json(req.body.title, req.body.url, req.id);
  if (req.params.type === "telegram")
    if (!req.body.chatId || !req.body.title)
      return res.status(403).send("Missing parameters");
    options = telegram.create_telegram_json(req.body.title, req.body.chatId, req.id);

  starton.create_automation(req, res, options);
});

module.exports = router;