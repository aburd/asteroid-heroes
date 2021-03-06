const path = require('path');
const express = require('express');
const app = express();
const { Server } = require('socket.io');
const initGame = require('./game');

app.use('/', express.static(path.join(__dirname, '../../client/dist')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

const port = process.env.PORT || 8080;

const server = app.listen(port, function () {
  console.log(`http://localhost:${port}`);
});

const io = new Server(server);
io.on('connection', initGame);
