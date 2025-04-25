const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const songRoute = require('./routes/song');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/generate-song', songRoute);

module.exports = app;
