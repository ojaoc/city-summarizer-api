require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const helmet = require('helmet');

const indexRouter = require('./routes/index');
const cityRouter = require('./routes/city');

const app = express();

app.use(helmet()); // Helmet helps you secure your Express apps by setting various HTTP headers.

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// setup logger
if (app.get('env') === 'production') {
  const logDir = path.join(__dirname, '/logs/');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, {
      recursive: true,
    });
  }

  const accessLogStream = fs.createWriteStream(`${logDir}/access.log`, {
    flags: 'a',
  });
  // This will log to logs/access.log file
  app.use(logger('combined', { stream: accessLogStream }));
}
// This will log in the console
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/city', cityRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
