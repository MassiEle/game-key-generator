const mysql = require('mysql2');
const bcrypt = require('bcrypt');

exports.handler = async function(event, context) {
  const data = JSON.parse(event.body);
  const username = data.username;
  const password = data.password;

  // Connessione al database (modifica con i tuoi parametri)
  const connection = mysql.createConnection({
    host: 'ImNotEternal.mysql.pythonanywhere-services.com',
    user: 'ImNotEternal',
    password: 'Massimo10#',
    database: 'ImNotEternal$AdminPanelDB',
  });

  try {
    const [rows] = await connection.promise().query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, bcrypt.hashSync(password, 10)]
    );
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Key generated successfully" })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
