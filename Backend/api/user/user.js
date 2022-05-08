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
  const { id } = req;
  const { toSave } = req.body;

  if (!toSave)
    return res.status(400).json({ error: 'Please select a wallet to save' });

  database.query('SELECT * FROM savelater WHERE save_addr = ? AND id_addr = ?', [toSave, id], (err, result) => {
    if (err)
      return res.status(500).json({ error: 'An error occured' });
    if (result.length > 0) {
      database.query('DELETE FROM savelater WHERE save_addr = ? AND id_addr = ?', [toSave, id], (err, result) => {
        if (err)
          return res.status(500).json({error: 'An error occured'});
      });
      return res.status(200).json({success: 'Wallet removed from save later'})
    } else {
      database.query('INSERT INTO savelater (id_addr, save_addr) VALUES (?, ?)', [id, toSave], (err, result) => {
        if (err)
          return res.status(500).json({ error: 'An error occured: ' + err.message });
        return res.status(200).json({ success: 'Wallet saved' });
      });
    }
  });
}

const getAllSave = (req, res) => {
  const { id } = req;
  database.query('SELECT * FROM savelater WHERE id_addr = ?', [id], (err, result) => {
    if (err)
      return res.status(500).json({ error: 'An error occured' });
    return res.status(200).json({ success: result });
  });
}

const saveLatter_by_id = (req, res) => {
  const {id} = req;
  const idSl = req.params.id;

  database.query('SELECT * FROM savelater WHERE id_addr = ? AND id = ?', [id, idSl], (err, result) => {
    if (err)
      return res.status(500).json({error: 'An error occured'});
    if (result.length === 0)
      return res.status(400).json({error: 'Not found'});
    return res.status(200).json({success: result});
  });
};

const automations = (req, res) => {
  database.query('SELECT * FROM automations WHERE id_addr = ?', [req.id], (err, result) => {
    if (err)
      return res.status(500).json({ error: 'An error occured' });
    if (result.length === 0)
      return res.status(404).json({ error: 'Automation not found' });
    return res.status(200).json({ automations: result });
  });
}

const automations_by_id = (req, res) => {
  const { id } = req.params;
  database.query('SELECT * FROM automations WHERE id = ? AND id_addr', [id, req.user], (err, result) => {
    if (err)
      return res.status(500).json({ error: 'An error occured' });
    if (result.length === 0)
      return res.status(404).json({ error: 'Automation not found' });
    return res.status(200).json({ automation: result[0] });
  });
}

module.exports = {
  changeUsername,
  automations,
  saveLater,
  automations_by_id,
  getAllSave,
  saveLatter_by_id
}