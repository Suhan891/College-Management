const express = require('express');

const router = express.Router();

const commonMiddleware = require('../middleware/common');
const commonController = require('../controllers/common');

router.post("/login", commonMiddleware.validateUserLogin, commonController.login)
router.post("/refresh-token", commonMiddleware.validateRefreshAccess, commonController.refreshAccessHandler)
router.post("/verify-role", commonMiddleware.vaildateEmailRoles, commonController.emailVerificationRoles)

module.exports = router
