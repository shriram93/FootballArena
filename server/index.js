const express = require('express');
const cors = require('cors')

const api = require('./api');
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());

app.use('/api', api);
app.use(function(req, res) {
    res.status(404).send('Not Found');
});

module.exports = app;