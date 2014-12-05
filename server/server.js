var express = require('express');

// Middleware
var morgan = require('morgan');
var parser = require('body-parser');
var cors = require('cors');
var process = require('process');

// Router
var router = require('./routes.js');

//Port
console.log("process", process);
var port = process.env.PORT || 3000;

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
app.use("/", router);

//Have to think about whether static serving is necessary in this context.

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}