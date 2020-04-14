require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const employeeRouter = require('./employee_personal/employee-personal-router');
const companyRouter = require('./employee_company/employee-company-router');

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

app.use('/api/employees', employeeRouter);
app.use('/api/company', companyRouter);

module.exports = app;

// import routers
// const employeesRouter = require('./routers/employees-router');
// const protectedRouter = require('./routers/protected-router');

// set up routes
// const routes = [
//   {
//     url: '/employees',
//     router: employeesRouter,
//   },
//   {
//     url: '/protected',
//     router: protectedRouter,
//   }
// ];

// add routes to app
// routes.forEach(({ url, router }) => {
//   app.use(url, router);
// });

// list endpoints by default
// app.get('/', (req, res) => {
//   return res
//     .status(200)
//     .json({
//       endpoints: routes.map(route => route.url)
//     });
// });



// the bottom line, literally
