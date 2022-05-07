const database = require('../config/database');
const web3 = require('web3');

const check_user = (req, res) => {
    const { address } = req.body;

    if (!address)
        return res.status(400).json({ error: 'Please provide an address' });
    if (!web3.utils.isAddress(address))
        return res.status(400).json({ error: 'Please provide a valid ethereum address' });

    database.query('SELECT * FROM wallets WHERE wallet = ?', [address], (err, results) => {
        if (err) throw err;
        if (results.length > 0)
            return res.status(200).json({ nonce: results[0].nonce });
        const nonce = Math.floor(Math.random() * 1000000).toString();
        database.query('INSERT INTO wallets (wallet, nonce) VALUES (?, ?)', [address, nonce], (err, results) => {
            if (err) throw err;
            return res.status(200).json({ nonce: nonce });
        });
    });
}

const login = (req, res) => {
    const { address, signature } = req.body;

    if (!address)
        return res.status(400).json({ error: 'Please provide an address' });
    if (!signature)
        return res.status(400).json({ error: 'Please provide a signature' });
    if (!web3.utils.isAddress(address))
        return res.status(400).json({ error: 'Please provide a valid ethereum address' });

    database.query('SELECT * FROM wallets WHERE wallet = ?', [address], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const nonce = results[0].nonce;
            //signature
        }
        return res.status(400).json({ error: 'Invalid signature' });
    });
}

module.exports = {
    check_user
}