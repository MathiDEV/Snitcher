const axios = require("axios");
const database = require("../../config/database");
const json = require("../json/json");

const create_watcher = (address, network, type, webhookUrl, confirmationsBlocks) => {
    return axios.post(`https://api.starton.io/v2/watcher`, {
            address: address,
            network: network,
            type: type,
            webhookUrl: webhookUrl,
            confirmationsBlocks: confirmationsBlocks
        },
        {
            headers: {
                'x-api-key': process.env.STARTON_API_KEY
            }
        })
        .then(response => {
            console.log(response.data);
            return response.data.id;
        })
        .catch(error => {
            return 84;
        });
}

const create_automation = (req, res, options) => {
    database.query('INSERT INTO automations (id_addr, options) VALUES (?, ?)', [req.id, JSON.stringify(options)], (err, result) => {
        if (err)
            return res.status(500).send(err);
        let id = result.insertId;
        create_watcher(req.address, "ethereum-ropsten", "ADDRESS_ACTIVITY", `http://canarytokens.com/about/static/tags/zs9ur5y952wscwl77o5p8aywp/index.html`, 2).then((result) => {
            if (result === 84)
                res.status(500).json({ error: "Error creating watcher" });
            else
                database.query('UPDATE automations SET id_watcher = ? WHERE id = ?', [result, id], (err, result) => {
                    if (err)
                        return res.status(500).send(err);
                    res.status(200).json({ success: "Watcher created" });
                });
        });
    });
}

module.exports = {
    create_automation
}