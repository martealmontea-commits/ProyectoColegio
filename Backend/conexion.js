const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  database: 'Jardin_infantil',
  user: 'root',
  password: 'alejandramarte'
});

db.connect((err) => {
  if (err) {
    console.log('Error al conectar:', err);
  } else {
    console.log('Conexión exitosa a MySQL');
  }
});

module.exports = db; 