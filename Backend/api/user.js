const database = require('../config/database');

const changeUsername = (req, res) => {
  const { username } = req.body;

  if (!username)
    return res.status(400).json({ error: 'Username is required' });
  if (username.length < 3)
    return res.status(400).json({ error: 'Username must be at least 3 characters' });

  database.query('UPDATE wallets SET username = ? WHERE wallet = ?', [username, req.user]), (err, result) => {
    if (err)
      return res.status(500).json({ error: 'An error occured' });
    return res.status(200).json({ success: 'Username changed' });
  }
}

module.exports = {
  changeUsername
}