const request = require('request');
const json = require("../json/json");

const sendMessage = (chatId, from, to, amount, currency) => {
    if (!chatId || !from || !to || !amount || !currency)
        return 84;
    request.post({
        url: 'https://api.telegram.org/bot' + process.env.TELEGRAM_TOKEN + '/sendMessage',
        form: {
            chat_id: chatId,
            parse_mode: 'markdown',
            text: "* ⚠️ ALERT ⚠️ * \n\n*From*:\n" + from + "\n*To*:\n" + to + "\n\n*Amount*:\n" + amount + " " + currency
        }
    }, function(error, response, body) {
        if (error) {
            console.log(error);
        }
    });
}

const create_telegram_json = (title, chatId, user_id) => {
    return json.create_webhook_json(
        title,
        "telegram",
        {
            chatId: chatId,
        },
        user_id
    );
}

module.exports = {
    sendMessage,
    create_telegram_json
}