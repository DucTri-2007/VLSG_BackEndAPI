const express = require('express');
const httpStatus = require('http-status');
const routes = require('./routes');
const { errorHandler } = require('./middlewares/error.middleware');
const ApiError = require('./utils/ApiError');

const app = express();

// Parse JSON request body
app.use(express.json());

// Parse URL-encoded request body
app.use(express.urlencoded({ extended: true }));

// V1 API routes under prefix /api/v1
app.use('/api/v1', routes);

// Send back 404 error for any unknown API request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'API Route Not Found'));
});

// Global error handling middleware
app.use(errorHandler);

module.exports = app;
