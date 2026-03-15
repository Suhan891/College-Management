const express = require('express');

const router = express.Router();

const authorization = require('../middleware/authorization')
const subjectMiddleware = require('../middleware/subject');
const subjectController = require('../controllers/subject');

router.post('/create', authorization.validateUser, authorization.validateCollegeHead, subjectMiddleware.validateCreateSubject, subjectController.createSubject)
router.post("/class/create",authorization.validateUser, authorization.validateCollegeHead, subjectMiddleware.validateCreateSubjectClass, subjectController.createSubjectClass)

module.exports = router