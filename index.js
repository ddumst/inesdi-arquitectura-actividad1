const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());


/** Routes */
const routes = require('./config/routes.config');
app.use('/api', routes);

/** Error Handling */
app.use((req, res, next) => {
  next(createError(404, 'Route not found'))
})

app.listen(8000, () => console.log('Server running on http://localhost:8000'));