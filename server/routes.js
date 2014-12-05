var controllers = require('./controllers.js');
var router = require('express').Router();

for (var route in controllers) {
  router.route("/" + route)
    .get(controllers[route].get)
    .post(controllers[route].post);
}

router.route("/list")
  .delete(controllers.list.todelete);

module.exports = router;