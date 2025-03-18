// api/validate-key.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'ImNotEternal.mysql.pythonanywhere-services.com',
  user: 'ImNotEternal',
  password: 'Massimo10#',
  database: 'ImNotEternal$AdminPanelDB'
});

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { username, key } = req.body;

    if (!username || !key) {
      return res.status(400).json({ error: 'Username and key are required' });
    }

    connection.execute(
      'SELECT * FROM keys WHERE username = ? AND key = ? AND expiration > NOW()',
      [username, key],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Database error' });
        }

        if (results.length > 0) {
          return res.status(200).json({ message: 'Key is valid' });
        } else {
          return res.status(400).json({ error: 'Invalid or expired key' });
        }
      }
    );
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
