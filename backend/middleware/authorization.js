const authorizationService = require("../service/authorization");
const tokens = require('../lib/tokens');
const { errorResponse } = require("../utils/response");
const { status, roles } = require("../utils/constants");

const validateUser = (req, res, next) => {
    // Check of role
    const authHeader = req.headers?.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        errorResponse.message = "Token not avalable"
        return res.status(status.BAD_REQUEST).json(errorResponse)
  }
  const availableToken = authHeader.split(" ")[1];
  const authData = tokens.verifyAccessToken(availableToken)
  if(!authData) {
    errorResponse.message = "Invalid Token. Auth data not received"
    return res.status(status.BAD_REQUEST).json(errorResponse)
  }

  const user = authorizationService.validateUserId(authData.userId)

  if(user.role !== authData.role) {
    errorResponse.message = "Invalid token. Role not matching"
    return res.status(status.BAD_REQUEST).json(errorResponse)
  }

  let receivedCollegId = null
  if(authData.role === roles.ADMIN){
    // to be decided
  } else if(authData.role === roles.COLLEGE) {
            const {result, err, status: stat} = authorizationService.checkCollegeRole(user_id)
            if(err)
                return res.status(stat).json(err)

            receivedCollegId = result.college_id

        } else if(authData.role === roles.TEACHER) {
            const {result, err, status: stat} = authorizationService.checkTeacherRole(user_id)
            if(err)
                return res.status(stat).json(err)

            receivedCollegId = result.college_id

        } else if(authData.role === roles.STUDENT) {
            const {result, err, status: stat} = authorizationService.checkStudentRole(user_id)
            if(err)
                return res.status(stat).json(err)

            receivedCollegId = result.college_id
        }
    if(receivedCollegId !== authData.college_id) {
        errorResponse.message = "Invalid Token. College Id not matching"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }
    req = {
        role: user.role,
        collegeId: authData.college_id,
        userId: authData.userId
    }
}

const validateCollegeHead = (req, res, next) => {
    const {userId} = req

    const {result, err, status: stat} = authorizationService.checkCollegHead(userId);
    if(err)
        return res.status(stat).json(err)

    req.collegeId = result.college_id
    next()
}

const validateCollegeAndStreamHead = (req, res, next) => {
    const userId = req.userId
    // Stream head and college head is getting allowed
    const role = req.role
    if(role === roles.COLLEGE)  // No validation required if college head is editing
        next() 
    
    if(roles !== roles.TEACHER && roles !== roles.ADMIN) {
        errorResponse.message = "You are not authorized to access such a route"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result, err: streamError, status: stat} = authorizationService.checkStreamHead(userId)
    if(streamError) 
        return res.status(stat).json(streamError)

    next()
}
const validateCollegeAndDepartmentHead = (req, res, next) => {
    const userId = req.userId
    // Stream head and college head is getting allowed
    const role = req.role
    if(role === roles.COLLEGE)  // No validation required if college head is editing
        next() 
    
    if(roles !== roles.TEACHER && roles !== roles.ADMIN) {
        errorResponse.message = "You are not authorized to access such a route"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result, err: streamError, status: stat} = authorizationService.checkDepartmentHead(userId)
    if(streamError) 
        return res.status(stat).json(streamError)

    next()
}
const validateCollegeAndClassTeacher = (req, res, next) => {
    const userId = req.userId
    // Stream head and college head is getting allowed
    const role = req.role
    if(role === roles.COLLEGE)  // No validation required if college head is editing
        next() 
    
    if(roles !== roles.TEACHER && roles !== roles.ADMIN) {
        errorResponse.message = "You are not authorized to access such a route"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result: stream, err: streamError, status: stat} = authorizationService.checkClassTeacher(userId)
    if(streamError) 
        return res.status(stat).json(streamError)

    next()
}

module.exports = {
    validateUser,
    validateCollegeHead,

    validateCollegeAndStreamHead,
    validateCollegeAndDepartmentHead,
    validateCollegeAndClassTeacher
}
