var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var paypal = require('paypal-rest-sdk');

//var profileRouter = require('./routes/profileRoutes');
var stationRouter = require('./routes/stationRoutes');
//var couponRouter = require('./routes/couponRoutes');
//var organizerRouter = require('./routes/organizerRoutes');




var app = express();


paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AUF4Ow9SBpfk44Ib3t0nzFI0mheFg_0qSzkrOH64EmfE7IgjgjXhqT5Xr7aw4erWcRpzVighh81RRp5w',
  'client_secret': 'EHqCsIHtB_7FOKKiRfXr9n0sB5IUsnI0iEUhnxqFYizsRyWBrjGpMFlVvQvth9pkskUP9JoZPKAVAPUs'
});


// cross origin form security reason
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type");
  if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, DELETE');
      return res.status(200).json({});
  }
  next();
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/station', stationRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

//module.exports = app;