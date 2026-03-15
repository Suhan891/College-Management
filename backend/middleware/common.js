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
    console.log(value.password)
    console.log(result.password)


    const isMatch = checkLogin(value.password, result.password)
    console.log(isMatch)
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
        return res.status(401).json(errorResponse)
    }

    const refreshData = tokens.verifyRefreshToken(token)

    const {result, err, status: stat} = await validateUserId(refreshData.sub);
    if(err)
        return res.status(401).json(err)

    console.log("Result: ", result)
    console.log("Refresh data:", refreshData)
    if(result.tokenVersion !== refreshData.tokenVersion){
        errorResponse.message = "Login to create a new Token"
        return res.status(401).json(errorResponse)
    }

    req.user = result
    next()
}

const vaildateEmailRoles = async (req, res, next) => {
    const {token} = req.query
    if(!token) {
        errorResponse.message = "Token is required"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const payload = tokens.verifyRolesToken(token)
    if(!payload) {
        errorResponse.message = "Invalid Token"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result: userData, err}= await getUser({user_id:payload.sub})
    if(err) {
        errorResponse.error = err
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }    console.log(userData)
    if(!userData || userData.length === 0) {
        errorResponse.message = "No such User Available"
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }

    if(userData.is_email_verified) {
        errorResponse.message = "Email already verified. Please Login"
        return res.status(status.BAD_REQUEST).json(errorResponse) // It could also be redirected
    }

    if(userData.role !== payload.role) {
        errorResponse.message = "Invalid Token"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    console.log(req.body)

    const {error, value} = validateCommon.validateEmailVerifyRoles.validate(req.body) // also add some to return not extra than these
    if(error){
        errorResponse.message = error.details[0].message  // also have to do replace and all
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    req.userData = {userData, ...value}
    next()
}

module.exports = {
    validateUserLogin,
    validateRefreshAccess,
    vaildateEmailRoles
}