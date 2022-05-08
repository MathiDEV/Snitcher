
const sendMessage = (url, from, to, amount, currency) => {
    //send message to microsoft teams using the webhook url
    const payload = {
        "type": "message",
        "subject": "New transaction",
        "body": {
            "contentType": "html",
            "content": `<p>You have received ${amount} ${currency} from ${from}</p>`
        },
        "toRecipients": [
            {
                "emailAddress": {
                    "address": to
                }
            }
        ]
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.MICROSOFT_TOKEN}`

        }
    }
}