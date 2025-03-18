const mysql = require('mysql2');

exports.handler = async function(event, context) {
  const data = JSON.parse(event.body);
  const { key, username } = data;

  if (!key || !username) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Key and username are required" })
    };
  }

  // Connessione al database (modifica con i tuoi parametri)
  const connection = mysql.createConnection({
    host: 'ImNotEternal.mysql.pythonanywhere-services.com',
    user: 'ImNotEternal',
    password: 'Massimo10#',
    database: 'ImNotEternal$AdminPanelDB',
  });

  try {
    // Verifica se la chiave è valida (non scaduta e associata all'utente)
    const [rows] = await connection.promise().query(
      "SELECT * FROM keys WHERE key = ? AND username = ? AND expiration > NOW()",
      [key, username]
    );

    if (rows.length > 0) {
      // La chiave è valida
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Key is valid" })
      };
    } else {
      // La chiave non è valida
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid or expired key" })
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
