const teacherService = require("../service/teacher")
const { status, roles } = require("../utils/constants")
const { errorResponse } = require("../utils/response")

const validateTeacher = require("../validations/teacher")

const validateTeacherCreate = (req, res, next) => {
    const {value, error} = validateTeacher.validateTeacherCreation.validate(req.body)
    if(error){
        errorResponse.message = error.message
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result, err} = teacherService.existingUser(value.email)
        if(err){
            errorResponse.error = err
            return res(status.SERVER_ERROR).json(errorResponse)
        }
        if(result){
            errorResponse.message = "Email already registered"
            return res(status.BAD_REQUEST).json(errorResponse)
        }

    if(value.role !== roles.TEACHER){
        errorResponse.message = "Invalid role credentials"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }
    
    req.teacherData = value
    next()
}

const validateRegisterTeacher = (req, res, next) => {
    const {error, value} = validateTeacher.validateTeacherRegistration.validate(req.body)
    if(error){
        errorResponse.message = error.message
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result, err, status: stat} = teacherService.existingTeacher({registered_batch_number: value.batchNumber})
    if(err)
        return res.status(stat).json(err)

    req.teacherId = result.teacher_id
    req.collegeId = result.college_id
    next()
}

module.exports = {
    validateTeacherCreate,
    validateRegisterTeacher
}