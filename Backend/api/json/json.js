const axios = require('axios');
const database = require('../../config/database');

const create_webhook_json = (title, type, options, user_id) => {
  return {
    title: title,
    type: type,
    options: options,
    user_id: user_id
  }
}

const parse_and_execute = (req, res) => {
  let id = req.params.id;

  database.query('SELECT * FROM automations WHERE id = ?', [id], (err, results) => {
    if (err)
      return res.status(500).send('Internal server error');
    else
      if (results.length === 0)
        return res.status(404).send('Automation not found');
      else {
        let automation = results[0];
        console.log(automation);
        let options = JSON.parse(automation.options);

        if (options.type === 'discord')
          require('../automations/discord').sendMessage(options.options.url, req.body.data.transaction.from, req.body.data.transaction.to, req.body.data.transaction.value.raw  * Math.pow(10,-18), "ETH");
        if (options.type === 'teams')
          require('../automations/teams').sendMessage(options.options.url, req.body.data.transaction.from, req.body.data.transaction.to, req.body.data.transaction.value.raw / Math.pow(10,-18), "ETH");
        if (options.type === 'twilio') {
          if (options.options.type === 'text')
            require('../automations/twilio').sendText(options.options.number, req.body.data.transaction.from, req.body.data.transaction.to, req.body.data.transaction.value.raw  / Math.pow(10,-18), "ETH");
          if (options.options.type === 'call')
            require('../automations/twilio').sendCall(options.options.number, req.body.data.transaction.from, req.body.data.transaction.to, req.body.data.transaction.value.raw / Math.pow(10,-18), "ETH");
        }
        if (options.type === 'telegram') {
          require('../automations/telegram').sendMessage(options.options.chatId, req.body.data.transaction.from, req.body.data.transaction.to, req.body.data.transaction.value.raw / Math.pow(10,-18), "ETH");
        }
        res.status(200).send('Automation OK');
      }
  });
}


module.exports = {
  create_webhook_json,
  parse_and_execute
}