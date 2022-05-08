const router = require('express').Router();
const auth = require("../../middleware/auth");
const twilio = require("./twilio");
const discord = require("./discord");
const telegram = require("./telegram");
const teams = require("./teams");
const starton = require("../starton/api");

router.post('/create/:type/:action?', auth, (req, res) => {
    if (req.params.type !== "discord" && req.params.type !== 'telegram' && req.params.type !== 'twilio' && req.params.type !== 'teams')
        return res.status(403).send("Invalid type");
    if (req.body.event !== "ADDRESS_ACTIVITY" && req.body.event !== "ADDRESS_RECEIVED_NATIVE_CURRENCY" && req.body.event !== "ADDRESS_SENT_NATIVE_CURRENCY" && req.body.event !== "EVENT_TRANSFER" && req.body.event !== "EVENT_MINT" && req.body.event !== "EVENT_APPROVAL" && req.body.event !== "ERC721_EVENT_TRANSFER" && req.body.event !== "ERC1155_EVENT_TRANSFER_SINGLE" && req.body.event !== "ERC1155_EVENT_TRANSFER_BATCH")
        return res.status(403).send("Invalid event");
    if (!req.body.blocks)
        return res.status(403).send("No blocks");
    if (!req.body.address)
        return res.status(403).send("No address");

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