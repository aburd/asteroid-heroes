const path = require('path');
const express = require('express');

const app = express();

app.use('/public', express.static(path.join(__dirname, '../../client/dist')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

app.listen(8000, function () {
  console.log('Listing at http://localhost:8000');
});
