const path = require('path');
const express = require('express');

const app = express();

app.use('/', express.static(path.join(__dirname, '../../client/dist')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log(`http://localhost:${port}`);
});
