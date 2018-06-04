const router = require('express').Router();

// router handler to call given route
router.use('/users',require('./modules/users'));
router.use('/players', require('./modules/players'));
// exporting router to handle request
module.exports =  router