var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var gatewayRouter = require('./src/routes/gateway');
var deviceRouter = require('./src/routes/device');
const mongoose = require('mongoose');
connect();
// const models = require('./src/models/');

function listen() {
  // if (app.get('env') === 'test') return;
  // app.listen(3001);
  // console.log('Express app started on port ' + 3001);
}
function connect() {
  mongoose.connection
      .on('error', console.log)
      .on('disconnected', connect)
      .once('open', listen);
  return mongoose.connect('mongodb://host.docker.internal:27017/musala-task', {
    auth: {
      username: "essam",
      password: "12345",
    },
    authSource: "admin",
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

var app = express();
var cors = require('cors')

app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/gateway',gatewayRouter);
app.use('/device',deviceRouter);

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

module.exports = app;


/* TODO:
Conditions
You have to prepare a solution to the proposed problem in the defined period of time. The solution must comply with the requirements. For anything not explicitly listed, you are free to choose whatever technology/library/tool you feel comfortable with.

Once ready, you must send a package with the source code of the solution, so it can be built and reviewed by Musala Soft. Instructions how to use the solution must also be provided (resource names, SQL scripts to import test data, other scripts, etc.).
If you have completed the task after the deadline has expired, you are still encouraged to submit a solution.
Software Requirements
Programming language: JavaScript
Framework: Node.js/JavaScript + Angular/React or other   Database: MongoDB or in-memory Automated build: Solution of choice
Description
This sample project is managing gateways - master devices that control multiple peripheral devices.
Your task is to create a REST service (JSON/HTTP) for storing information about these gateways and their associated devices. This information must be stored in the database.
When storing a gateway, any field marked as “to be validated” must be validated and an error returned if it is invalid. Also, no more that 10 peripheral devices are allowed for a gateway.
The service must also offer an operation for displaying information about all stored gateways (and their devices) and an operation for displaying details for a single gateway. Finally, it must be possible to add and remove a device from a gateway.

Each gateway has:
	•	a unique serial number (string),
	•	human-readable name (string),
	•	IPv4 address (to be validated),
	•	multiple associated peripheral devices.
Each peripheral device has:
	•	a UID (number),
	•	vendor (string),
	•	date created,
	•	status - online/offline.
Other considerations
Please, provide
	•	Basic UI - recommended or (providing test data for Postman (or other rest client) if you do not have enough time.
	•	Meaningful Unit tests.
	•	Readme file with installation guides.
	•	An automated build.

 */
