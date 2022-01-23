require('dotenv').config();
const express = require('express');
const debug = require('debug')('beLikeApi');
const chalk = require('chalk');
const morgan = require('morgan');
const cors = require('cors');

require('./src/config/database');

const server = express();
const port = process.env.PORT || 5000;

server.use(cors());
server.use(morgan('dev'));
server.use(express.json());

server.listen(port, () =>
  debug(`Server is running on ${chalk.magenta(`http://localhost:${port}`)}`),
);
