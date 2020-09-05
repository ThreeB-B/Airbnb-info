const newrelic = require('newrelic');
const express = require('express');

const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');

const dbpostgres = require('../database/Postgres/index3.js');

const port = 3002;

// app.use(cors());
app.use(express.static(`${__dirname}/../client/dist`));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.get('/listings/:id', (req, res) => {
  dbpostgres.getRoomById(req, res);
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
