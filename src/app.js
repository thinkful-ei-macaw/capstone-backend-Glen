require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const employeeRouter = require('./employees/employee-router');
const careerRouter = require('./careers/careers-router');
const userRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router')


const app = express();

const morganOption = (process.env.NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

const errorHandler = (error, req, res, next) => {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'Server error' } };
  } else {
    response = { message: error.message, error };
  }
  res.status(500).json(response);

}

app.use(errorHandler)


// set up middleware
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => res.send('Hello'))
app.use('/api/employees', employeeRouter);
app.use('/api/careers', careerRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);


module.exports = app;


