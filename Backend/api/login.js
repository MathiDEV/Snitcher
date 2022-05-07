const database = require('../config/database');
const web3 = require('web3');
const ethUtil = require('ethereumjs-util');
const recoverPersonnalSignature = require('eth-sig-util');
const jwt = require('jsonwebtoken');
const {recoverPersonalSignature} = require("eth-sig-util");

const check_user = (req, res) => {
    const { address } = req.body;

    if (!address)
        return res.status(400).json({ error: 'Please provide an address' });
    if (!web3.utils.isAddress(address))
        return res.status(400).json({ error: 'Please provide a valid ethereum address' });

    database.query('SELECT * FROM wallets WHERE wallet = ?', [address.toLowerCase()], (err, results) => {
        if (err) throw err;
        if (results.length > 0)
            return res.status(200).json({ nonce: results[0].nonce });
        const nonce = Math.floor(Math.random() * 1000000).toString();
        database.query('INSERT INTO wallets (wallet, nonce) VALUES (?, ?)', [address.toLowerCase(), nonce], (err, results) => {
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
    if (signature.length !== 132)
        return res.status(400).json({ error: 'Please provide a valid signature' });

    database.query('SELECT * FROM wallets WHERE wallet = ?', [address], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const msg = `You are signing a random nonce in order to login to snitcher: ${results[0].nonce}`;
            const msgBuffer = ethUtil.bufferToHex(Buffer.from(msg, 'utf8'));

            const recovered = recoverPersonalSignature({
                data: msgBuffer,
                sig: signature
            });

            if (recovered.toLowerCase() === address.toLowerCase()) {
                const nonce = Math.floor(Math.random() * 1000000).toString();
                database.query('UPDATE wallets SET nonce = ? WHERE wallet = ?', [nonce, address.toLowerCase()], (err, results) => {
                    if (err) throw err;
                    const token = jwt.sign({ address: address.toLowerCase() }, process.env.SECRET, { expiresIn: '1h' });
                    return res.status(200).json({ token: token });
                });
                return res.status(400).json({ error: "There was an error authenticating the user" });
            }
            return res.status(400).json({ error: "The signature is not valid" });
        }
        return res.status(400).json({ error: 'Invalid signature' });
    });
}

module.exports = {
    check_user,
    login
}