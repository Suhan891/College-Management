const { checkLogin } = require("../lib/hashing")
const tokens = require("../lib/tokens")
const validateCommon = require("../validations/common")
const { findUser, validateUserId, getUser } = require("../service/user")
const { status } = require("../utils/constants")
const { errorResponse } = require("../utils/response")

const validateUserLogin = (req, res, next) => {
    const {error, value} = validateCommon.validateLogin.validate(req.body) // also add some to return not extra than these
    if(error){
        errorResponse.message = error  // may return message in .message
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const email = value.email
    const {result, err, status: stat} = findUser(email);
    if(err)
        return res.status(stat).json(err)

    const isMatch = checkLogin(value.password, result.password)

    if(!isMatch){
        errorResponse.message = "Please provide a valid password"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    if(result.role !== value.role){  // Checked if doing login with registered role
        errorResponse.message = "Provide a valid role"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    req.user = {...result, password: null, email}
    next()
}

const validateRefreshAccess = (req, res, next) => {
    const token = req.cookies?.refreshToken
    if(!token) {
        errorResponse.message = "Token not available"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const refreshData = tokens.verifyRefreshToken(token)

    const {result, err, status: stat} = validateUserId(refreshData.sub);
    if(err)
        return res.status(stat).json(err)

    if(result.tokenVersion !== refreshData.tokenVersion){
        errorResponse.message = "Login to create a new Token"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    req.user = result
    next()
}

const vaildateEmailRoles = (req, res, next) => {
    const {token} = req.query
    if(!token) {
        errorResponse.message = "Token is required"
        return errorResponse.status(status.BAD_REQUEST).json(errorResponse)
    }

    const payload = token.verifyRolesToken(token)
    if(!payload) {
        errorResponse.message = "Invalid Token"
        return errorResponse.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {resullt: userData, err, status: stat} = getUser(payload.sub)
    if(err)
        return res.status(stat).json(errorResponse)

    if(userData.isEmailVerified) {
        errorResponse.message = "Email already verified. Please Login"
        return errorResponse.status(status.BAD_REQUEST).json(errorResponse) // It could also be redirected
    }

    if(userData.role !== payload.role) {
        errorResponse.message = "Invalid Token"
        return errorResponse.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {error, value} = validateCommon.validateLogin.validate(req.body) // also add some to return not extra than these
    if(error){
        errorResponse.message = error  // may return message in .message
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    req.userData = userData
    next()
}

module.exports = {
    validateUserLogin,
    validateRefreshAccess,
    vaildateEmailRoles
}