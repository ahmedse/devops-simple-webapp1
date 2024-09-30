const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run("CREATE TABLE users (name TEXT)");
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
  const name = req.body.name;
  db.run('INSERT INTO users(name) VALUES(?)', [name], (err) => {
    if (err) return console.error(err.message);
    console.log('A new row has been created');
  });
  res.redirect('/');
});

app.get('/users', (req, res) => {
  db.all("SELECT name FROM users", [], (err, rows) => {
    if (err) throw err;
    res.send(JSON.stringify(rows));
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});