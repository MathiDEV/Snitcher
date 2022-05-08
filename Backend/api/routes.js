const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const login = require("./login/login");
const user = require("./user/user");
const bestUsers = require("./user/bestUsers");
const discord = require("./automations/discord");
const telegram = require("./automations/telegram");
const twilio = require("./automations/twilio");
const teams = require("./automations/teams");
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

router.get('/user/automations', auth, (req, res) => {
  user.automations(req, res);
});

router.get('/user/automations/:id',auth, (req, res) => {
  user.automations_by_id (req, res);
});

router.get('/user/bestusers', auth, (req, res) => {
    bestUsers.bestUsers(req, res);
});

router.post('/user/saveLater', auth, (req, res) => {
  user.saveLater(req, res);
});

router.get('/user/getAllSave', auth, (req, res) => {
  user.getAllSave(req, res);
});

router.get('/user/saveLatter/:id', auth, (req, res) => {
  user.saveLatter_by_id(req, res);
});

router.post('/webhooks/:id', (req, res) => {
  console.log(req);
  console.log(req.body);
  json.parse_and_execute(req, res);
});

router.post('/automations/create/:type/:action?', auth, (req, res) => {
  if (req.params.type !== "discord" && req.params.type !== 'telegram' && req.params.type !== 'twilio' && req.params.type !== 'teams')
    return res.status(403).send("Invalid type");
  if (req.body.event !== "ADDRESS_ACTIVITY" && req.body.event !== "ADDRESS_RECEIVED_NATIVE_CURRENCY" && req.body.event !== "ADDRESS_SENT_NATIVE_CURRENCY" && req.body.event !== "EVENT_TRANSFER" && req.body.event !== "EVENT_MINT" && req.body.event !== "EVENT_APPROVAL" && req.body.event !== "ERC721_EVENT_TRANSFER" && req.body.event !== "ERC1155_EVENT_TRANSFER_SINGLE" && req.body.event !== "ERC1155_EVENT_TRANSFER_BATCH")
    return res.status(403).send("Invalid event");
  if (!req.body.blocks)
    return res.status(403).send("No blocks");

  let options;

  if (req.params.type === "twilio") {
    if (req.params.action !== "call" && req.params.action !== "text")
      return res.status(403).send("Invalid action");
    if (!req.body.title || !req.body.number)
      return res.status(403).send("Missing parameters");
    options = twilio.create_twilio_json(req.body.title, req.body.number, req.params.action, req.id);
  }
  if (req.params.type === "discord") {
    if (!req.body.title || !req.body.url)
      return res.status(403).send("Missing parameters");
    options = discord.create_discord_json(req.body.title, req.body.url, req.id);
  }
  if (req.params.type === "telegram") {
    if (!req.body.chatId || !req.body.title)
      return res.status(403).send("Missing parameters");
    options = telegram.create_telegram_json(req.body.title, req.body.chatId, req.id);
  }
  if (req.params.type === "teams") {
    if (!req.body.title || !req.body.url)
      return res.status(403).send("Missing parameters");
    options = teams.create_teams_json(req.body.title, req.body.url, req.id);
  }

  starton.create_automation(req, res, options);
});

module.exports = router;