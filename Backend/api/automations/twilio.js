const twilio = require('twilio');
const json = require ('../json/json');

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const sendText = (number, from, to, amount, currency) => {
    client.messages
        .create({
            body: `⚠ ALERT ⚠ \n\n From: ${from}\n To: ${to}\n\nAmount: \n${amount} ${currency}`,
            from: process.env.TWILIO_FROM_SMS,
            to: number,
        })
        .then(message => console.log(message.sid));
}

const sendCall = (number, from, to, amount, currency) => {
    client.calls
        .create({
            twiml: `<Response><Say>SNITCHER ALERT: Transaction from address: ${from} ; to address: ${to} ; of an amount of: ${amount} ${currency}. Transmission OVER</Say></Response>`,
            to: number,
            from: process.env.TWILIO_FROM_CALL,
        })
        .then(call => console.log(call.sid));
}

const create_twilio_json = (title, number, type, user_id, blocks, address, event) => {
    return json.create_webhook_json(
        title,
        "twilio",
        {
            number: number,
            type: type,
            blocks: blocks,
            address: address,
            event: event,
        },
        user_id
    );
}

module.exports = {
    sendText,
    sendCall,
    create_twilio_json
}