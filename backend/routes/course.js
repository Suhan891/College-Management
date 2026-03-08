const express = require('express');

const router = express.Router();

const authorization = require('../middleware/authorization')
const courseMiddleware = require('../middleware/course');
const courseController = require('../controllers/course');

router.post('/create', authorization.validateUser, authorization.validateCollegeHead,courseMiddleware.validateCreateCourse, courseController.createCourse)

module.exports = router