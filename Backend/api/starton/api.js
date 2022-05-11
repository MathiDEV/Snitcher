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
        create_watcher(req.body.address, "ethereum-mainnet", req.body.event, `${process.env.PUBLIC_HOSTNAME}:${process.env.PORT}/api/webhooks/${id}`, req.body.blocks).then((result) => {
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

const delete_watcher = (id) => {
    return axios.delete(`https://api.starton.io/v2/watcher/${id}`, {
            headers: {
                'x-api-key': process.env.STARTON_API_KEY
            }
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return 84;
        });
}

const delete_automation = (req, res) => {
    database.query('SELECT id_watcher FROM automations WHERE id = ? AND id_addr = ?', [req.params.id, req.id], (err, result) => {
        if (err)
            return res.status(500).send(err);
        if (result.length === 0)
            return res.status(400).json({ error: "Automation not found" });
        delete_watcher(result[0].id_watcher).then((result) => {
                if (result === 84)
                    res.status(500).json({ error: "Error deleting watcher" });
                else
                    database.query('DELETE FROM automations WHERE id = ? AND id_addr = ?', [req.params.id, req.id], (err, result) => {
                        if (err)
                            return res.status(500).send(err);
                        res.status(200).json({ success: "Automation deleted" });
                    });
        });
    });
};

module.exports = {
    create_automation,
    delete_automation
}