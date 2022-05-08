const { IncomingWebhook } = require('ms-teams-webhook');
const json = require("../json/json");

const sendMessage = (url, from, to, amount, currency) => {
  const webhook = new IncomingWebhook(url);

    (async () => {
        await webhook.send(JSON.stringify({
            "type":"message",
            "attachments":[
                {
                    "contentType":"application/vnd.microsoft.card.adaptive",
                    "contentUrl":null,
                    "content": {
                        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                        "type": "AdaptiveCard",
                        "version": "1.0",
                        "body": [
                            {
                                "type": "ColumnSet",
                                "id": "1ede2aba-61b9-faa0-9895-9ed0c26b2e6f",
                                "columns": [
                                    {
                                        "type": "Column",
                                        "id": "e5756242-0963-37a2-7cb4-4397886d60bb",
                                        "padding": "None",
                                        "width": "stretch",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "id": "20f3833e-0435-5c87-fad1-b528e0046fb6",
                                                "text": "Snitcher",
                                                "wrap": true
                                            }
                                        ],
                                        "verticalContentAlignment": "Center"
                                    },
                                    {
                                        "type": "Column",
                                        "id": "74215a26-fa8b-e549-cced-7f99fd34a661",
                                        "padding": "None",
                                        "width": "auto",
                                        "items": [
                                            {
                                                "type": "Image",
                                                "id": "795047e2-e63e-6e14-07ba-5a3e13323dff",
                                                "url": "https://i.imgur.com/o1mhcnV.png",
                                                "size": "Small"
                                            }
                                        ],
                                        "horizontalAlignment": "Right"
                                    }
                                ],
                                "padding": {
                                    "top": "Small",
                                    "bottom": "Small",
                                    "left": "Default",
                                    "right": "Small"
                                },
                                "style": "emphasis"
                            },
                            {
                                "type": "Container",
                                "id": "fbcee869-2754-287d-bb37-145a4ccd750b",
                                "padding": "Default",
                                "spacing": "None",
                                "items": [
                                    {
                                        "type": "TextBlock",
                                        "id": "44906797-222f-9fe2-0b7a-e3ee21c6e380",
                                        "text": "⚠️ New transaction",
                                        "wrap": true,
                                        "weight": "Bolder",
                                        "size": "Large"
                                    },
                                    {
                                        "type": "ColumnSet",
                                        "columns": [
                                            {
                                                "type": "Column",
                                                "id": "4c855686-bdb9-085a-c47b-8f7b76333f2d",
                                                "padding": "None",
                                                "width": "auto",
                                                "items": [
                                                    {
                                                        "type": "TextBlock",
                                                        "id": "b847d0fc-9f9a-6708-aa35-120f4d5947fb",
                                                        "text": "From:",
                                                        "wrap": true,
                                                        "weight": "Bolder"
                                                    },
                                                    {
                                                        "type": "TextBlock",
                                                        "id": "01ef70b7-4732-1db3-9537-86fd9bcf67e7",
                                                        "text": `${from}`,
                                                        "wrap": true
                                                    },
                                                    {
                                                        "type": "ColumnSet",
                                                        "columns": [
                                                            {
                                                                "type": "Column",
                                                                "id": "3d9a50f6-2554-ec4a-ec57-d3eacf84ac0f",
                                                                "padding": "None",
                                                                "width": "auto",
                                                                "items": [
                                                                    {
                                                                        "type": "TextBlock",
                                                                        "id": "72bd6e25-dc3c-4d92-5f0c-ed10b770cb93",
                                                                        "text": "Amount:",
                                                                        "wrap": true,
                                                                        "weight": "Bolder"
                                                                    },
                                                                    {
                                                                        "type": "TextBlock",
                                                                        "id": "092bbb1b-e141-abb9-b31f-cb050755b1d4",
                                                                        "text": `${amount} ${currency}`,
                                                                        "wrap": true
                                                                    }
                                                                ]
                                                            }
                                                        ],
                                                        "padding": "None"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "Column",
                                                "id": "6c255159-7cc9-1ee8-0ff4-713e81dd46fa",
                                                "padding": "None",
                                                "width": "auto",
                                                "items": [
                                                    {
                                                        "type": "TextBlock",
                                                        "id": "be60f994-1d48-82e1-bf9d-96706b518960",
                                                        "text": "To:",
                                                        "wrap": true,
                                                        "weight": "Bolder"
                                                    },
                                                    {
                                                        "type": "TextBlock",
                                                        "id": "e7d5b0a6-5291-44dd-09f9-4463c60d8761",
                                                        "text": `${to}`,
                                                        "wrap": true
                                                    }
                                                ]
                                            }
                                        ],
                                        "padding": "None"
                                    }
                                ]
                            }
                        ],
                        "padding": "None"
                    }
                }
            ]
                })
        );
    })();
}

const create_teams_json = (title, url, user_id) => {
    return json.create_webhook_json(
        title,
        "teams",
        {
            url: url,
        },
        user_id
    );
}

module.exports = {
  sendMessage,
  create_teams_json
}
