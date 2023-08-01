const express = require('express');
const app = express();

// dot env
const dotenv = require('dotenv');
dotenv.config();

// other packages
require('express-async-errors');
const morgan = require('morgan');

// db
const connect = require('./db/connect');

// middleware
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');

app.use(morgan('tiny'));
app.use(express.json());

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(PORT, console.log('Server is listening on port ' + PORT));
  } catch (error) {
    console.log('Failed to connect to db');
  }
};

start();
