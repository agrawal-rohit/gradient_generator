const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

var app = express();
var router = require('./services/router');
mongoose.connect('mongodb://admin:adminpassword@ds121955.mlab.com:21955/gradient_generator_database');

app.use(cors())
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use('/v1', router);

var PORT = process.env.PORT || 8000;

console.log('Listening on', PORT);
app.listen(PORT);
