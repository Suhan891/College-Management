const express = require('express');

const router = express.Router();

const authorization = require('../middleware/authorization')
const teacherMiddleware = require('../middleware/teacher')
const teacherController = require('../controllers/teacher');

router.post('/create', authorization.validateUser, authorization.validateCollegeHead, teacherMiddleware.validateTeacherCreate, teacherController.createTeacher)

module.exports = router