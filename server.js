var express = require('express');
var path = require('path');

// Middleware
var morgan = require('morgan');
var parser = require('body-parser');
var cors = require('cors');
//var process = require('process');

// Router
var router = require('./server/routes.js');

// process.env.nodeEnv = process.env.nodeEnv || 'development';
// //process.env.OPENSHIFT_NODEJS_IP ||
//            process.env.IP ||
//            undefined;

console.log("running", process.env.nodeEnv);

//Port
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000;

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set("port", port);

//Taking care of cross-origin requests
app.use(cors());

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());

// Set up our routes
app.use("/test", router);

//Have to think about whether static serving is necessary in this context.

var whereTo = path.join(__dirname, "./public"); //path to static content

// Serve the client files
app.use(express.static(whereTo));

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}