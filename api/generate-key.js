// api/generate-key.js
const crypto = require('crypto');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'ImNotEternal.mysql.pythonanywhere-services.com',
  user: 'ImNotEternal',
  password: 'Massimo10#',
  database: 'ImNotEternal$AdminPanelDB'
});

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const key = crypto.randomBytes(16).toString('hex');
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 12);

    connection.execute(
      'INSERT INTO keys (username, key, expiration) VALUES (?, ?, ?)',
      [username, key, expiration],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Database error' });
        }

        return res.status(200).json({ key: key, expiration: expiration });
      }
    );
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
