const express = require('express');
const cors = require('cors');
const morgan =require('morgan');

const { globalErrorHandler } = require('./utils/error');
const route = require('./routes');

const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(route);
  app.use(globalErrorHandler);

  return app;
}

module.exports = {
  createApp
}