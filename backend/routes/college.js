const express = require('express');

const router = express.Router();

const collegeMiddleware = require('../middleware/college')
const collegeController = require('../controllers/college');

router.post('/register',collegeMiddleware.validateCollegeCreation, collegeController.createCollege)
router.post('/verify-email', collegeMiddleware.validateCollegeEmailConfirmation, collegeMiddleware.validateCollegeAdress, collegeController.verifyEmail)


module.exports = router