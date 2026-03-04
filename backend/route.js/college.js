const express = require('express');

const router = express.Router();

const query = require('../db/db');
const { createCollege } = require('../controllers/college');

router.post('/register',createCollege)

module.exports = router