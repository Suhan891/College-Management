const { checkLogin } = require("../lib/hashing")
const tokens = require("../lib/tokens")
const validateCommon = require("../validations/common")
const { findUser, validateUserId, getUser } = require("../service/user")
const { status } = require("../utils/constants")
const { errorResponse } = require("../utils/response")

const validateUserLogin = async (req, res, next) => {
    const {error, value} = validateCommon.validateLogin.validate(req.body) // also add some to return not extra than these
    if(error){
        errorResponse.message = error.details[0].message.replace(/"/g, "")  // may return message in .message
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const email = value.email
    const {result, err} = await findUser(email);
    if(err) {
        errorResponse.error = err
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }

    if(!result || result.length === 0) {
        errorResponse.message = "No such user exists"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const isMatch = checkLogin(value.password, result.password)

    if(!isMatch){
        errorResponse.message = "Password Not matching"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    console.log("Result received: ",result)

    if(!result.is_email_verified){
        errorResponse.message = "Please verify your email before Login"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    req.user = {...result, password: null, email}
    next()
}

const validateRefreshAccess = async (req, res, next) => {
    const token = req.cookies?.refreshToken
    if(!token) {
        errorResponse.message = "Token not available"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const refreshData = tokens.verifyRefreshToken(token)

    const {result, err, status: stat} = await validateUserId(refreshData.sub);
    if(err)
        return res.status(stat).json(err)

    console.log("Result: ", result)
    console.log("Refresh data:", refreshData)
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