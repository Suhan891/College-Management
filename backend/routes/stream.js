const express = require('express');

const router = express.Router();

const authorization = require('../middleware/authorization')
const streamMiddleware = require('../middleware/stream')
const streamController = require('../controllers/stream');

router.post('/create', authorization.validateUser, authorization.validateCollegeHead, streamMiddleware.validateStreamCreation, streamController.createStream)

module.exports = router