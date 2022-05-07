const database = require('../../config/database');

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

const saveLater = (req, res) => {
  const { address, id } = req;
  const { toSave } = req.body;

  if (!toSave)
    return res.status(400).json({ error: 'Please select a wallet to save' });

  database.query('SELECT * FROM savelater WHERE save_addr = ? AND address = ?', [toSave, address], (err, result) => {
    if (err)
      return res.status(500).json({ error: 'An error occured' });
    if (result.length > 0) {
      database.query('DELETE FROM savelater WHERE save_addr = ? AND address = ?', [toSave, address], (err, result) => {
        if (err)
          return res.status(500).json({error: 'An error occured'});
      });
      return res.status(200).json({success: 'Wallet removed from save later'})
    } else {
      database.query('INSERT INTO savelater (id_addr, save_addr, address) VALUES (?, ?, ?)', [id, toSave, address], (err, result) => {
        if (err)
          return res.status(500).json({ error: 'An error occured: ' + err.message });
        return res.status(200).json({ success: 'Wallet saved' });
      });
    }
  });
}

module.exports = {
  changeUsername,
  saveLater
}