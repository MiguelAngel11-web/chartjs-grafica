const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist/grafica'));

app.get('/', function (req, res) {
<<<<<<< HEAD
=======
  res.send({ data: Math.floor(Math.random() * (500 - 1) + 1), code: 200, error: false });
>>>>>>> 6f5ea1c5b5b14ef06eced1f4440094981cef067d
  res.sendFile(path.join(__dirname +
    '/dist/grafica/index.html'));
});
app.listen(process.env.PORT || 3000);
