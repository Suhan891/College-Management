const express = require('express');

const router = express.Router();

const authorization = require('../middleware/authorization')
const studentMiddleware = require('../middleware/student')
const studentController = require('../controllers/student');

router.post('/create', authorization.validateUser, authorization.validateCollegeHead, studentMiddleware.registerStudent, studentController.createStudent)

module.exports = router