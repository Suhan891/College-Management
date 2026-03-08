const express = require('express');

const router = express.Router();

const authorization = require('../middleware/authorization')
const classMiddleware = require('../middleware/class');
const classController = require('../controllers/class');

router.post('/create', authorization.validateUser, authorization.validateCollegeHead, classMiddleware.validateClassCreation, classController.createClass)

module.exports = router