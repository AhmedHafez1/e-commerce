const express = require('express');
const app = express();

// dot env
const dotenv = require('dotenv');
dotenv.config();

// other packages
require('express-async-errors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// db
const connect = require('./db/connect');

// routes
const authRouter = require('./routes/authRoute');

// middleware
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');

app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  console.log(req.cookies);
  res.send('E-Commerce API');
});

app.get('/api/v1', (req, res) => {
  console.log(req.cookies);
  res.send('E-Commerce API');
});

app.use('/api/v1/auth', authRouter);

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
