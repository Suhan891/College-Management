const express = require('express');

const router = express.Router();

const authorization = require('../middleware/authorization')
const collegeMiddleware = require('../middleware/college')
const collegeController = require('../controllers/college');

router.post('/register',collegeMiddleware.validateCollegeCreation, collegeController.createCollege)
router.post('/verify-email', collegeMiddleware.validateCollegeEmailConfirmation, collegeMiddleware.validateCollegeAdress, collegeController.verifyEmail)
router.post('/calender/create', authorization.validateUser, authorization.validateCollegeHead, collegeMiddleware.validateCollegeCalender, collegeController.createCalender)
router.post("/calender/special/create", authorization.validateUser, authorization.validateCollegeHead, collegeMiddleware.validateCollegeSpecialDate, collegeController.createSpecialDate)

module.exports = router