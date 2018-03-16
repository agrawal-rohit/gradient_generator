const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

var app = express();
var router = require('./services/router');
mongoose.connect('mongodb://127.0.0.1:27017');

app.use(cors())
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use('/v1', router);

var PORT = process.env.PORT || 8000;
var HOST = process.env.HOST || '127.0.0.1';

console.log('Listening on', HOST, PORT);
app.listen(PORT, HOST);
