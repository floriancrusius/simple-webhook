const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database setup
const dbPath = path.join(__dirname, 'data', 'webhook_data.db');
const db = new sqlite3.Database(dbPath); // Use a file-based database
db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS webhook_data (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT, datetime TEXT)'
  );
});

// Create HTTP server and WebSocket server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Broadcast function to send data to all connected clients
function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Webhook endpoint
app.post('/webhook', (req, res) => {
  const data = JSON.stringify(req.body);
  const datetime = new Date().toISOString();
  db.run(
    'INSERT INTO webhook_data (data, datetime) VALUES (?, ?)',
    [data, datetime],
    function (err) {
      if (err) {
        return res.status(500).send('Database error');
      }
      // Broadcast new data to all WebSocket clients
      broadcast({ data, datetime });
      res.status(200).send('Data received');
    }
  );
});

// Endpoint to get data
app.get('/data', (req, res) => {
  db.all('SELECT * FROM webhook_data', (err, rows) => {
    if (err) {
      return res.status(500).send('Database error');
    }
    res.json(rows);
  });
});

// Start server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
