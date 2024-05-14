const express = require('express');
const app = express();
const cors = require('cors');
const SQLHandler = require('./scripts/sqlHandler');

const indexRouter = require('./routes/index.js')(SQLHandler);
require('dotenv').config();

express.urlencoded({ extended : false });

app.use(express.json());
app.use(cors({
    origin: "*",
    credential: true
}));

app.use('/', indexRouter);

module.exports = app;