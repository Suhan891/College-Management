const express = require('express');

const router = express.Router();

const collegeController = require('../controllers/college');

router.post('/register',createCollege)

module.exports = router