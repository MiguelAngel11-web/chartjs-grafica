const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist/grafica'));

app.get('/', function (req, res) {
  res.send({ data: Math.floor(Math.random() * (1000 - 1) + 1), code: 200, error: false });
  res.sendFile(path.join(__dirname +
    '/dist/grafica/index.html'));
});
app.listen(process.env.PORT || 3000);
