const express = require('express');

const router = express.Router();

const authorization = require('../middleware/authorization')
const departmentMiddleware = require('../middleware/department')
const departmentController = require('../controllers/department')

router.post('/create', authorization.validateUser, authorization.validateCollegeHead, departmentMiddleware.validateDepartmentCreation, departmentController.createDepartment)

module.exports = router