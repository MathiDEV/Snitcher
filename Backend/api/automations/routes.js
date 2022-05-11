const router = require('express').Router();
const auth = require("../../middleware/auth");
const twilio = require("./twilio");
const discord = require("./discord");
const telegram = require("./telegram");
const teams = require("./teams");
const starton = require("../starton/api");

router.post('/create', auth, (req, res) => {
    if (req.body.type !== "discord" && req.body.type !== 'telegram' && req.body.type !== 'twilio' && req.body.type !== 'teams')
        return res.status(403).send("Invalid type");
    if (req.body.event !== "ADDRESS_ACTIVITY" && req.body.event !== "ADDRESS_RECEIVED_NATIVE_CURRENCY" && req.body.event !== "ADDRESS_SENT_NATIVE_CURRENCY" && req.body.event !== "EVENT_TRANSFER" && req.body.event !== "EVENT_MINT" && req.body.event !== "EVENT_APPROVAL" && req.body.event !== "ERC721_EVENT_TRANSFER" && req.body.event !== "ERC1155_EVENT_TRANSFER_SINGLE" && req.body.event !== "ERC1155_EVENT_TRANSFER_BATCH")
        return res.status(403).send("Invalid event");
    if (!req.body.blocks)
        return res.status(403).send("No blocks");
    if (!req.body.address)
        return res.status(403).send("No address");

    let options;

    console.log(req.body);

    if (req.body.type === "twilio") {
        if (req.body.action !== "call" && req.body.action !== "text")
            return res.status(403).send("Invalid action");
        if (!req.body.title || !req.body.number)
            return res.status(403).send("Missing parameters");
        options = twilio.create_twilio_json(req.body.title, req.body.number, req.body.action, req.id, req.body.blocks, req.body.address, req.body.event);
    }
    if (req.body.type === "discord") {
        if (!req.body.title || !req.body.url)
            return res.status(403).send("Missing parameters");
        options = discord.create_discord_json(req.body.title, req.body.url, req.id, req.body.blocks, req.body.address, req.body.event);
    }
    if (req.body.type === "telegram") {
        if (!req.body.chatId || !req.body.title)
            return res.status(403).send("Missing parameters");
        options = telegram.create_telegram_json(req.body.title, req.body.chatId, req.id, req.body.blocks, req.body.address, req.body.event);
    }
    if (req.body.type === "teams") {
        if (!req.body.title || !req.body.url)
            return res.status(403).send("Missing parameters");
        options = teams.create_teams_json(req.body.title, req.body.url, req.id, req.body.blocks, req.body.address, req.body.event);
    }

    starton.create_automation(req, res, options);
});

router.get('/delete/:id', auth, (req, res) => {
    starton.delete_automation(req, res);
});

module.exports = router;