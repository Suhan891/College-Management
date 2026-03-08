const teacherService = require("../service/teacher")
const { status, roles } = require("../utils/constants")
const { errorResponse } = require("../utils/response")

const validateTeacher = require("../validations/teacher")

const validateTeacherCreate = async (req, res, next) => {
    const {value, error} = validateTeacher.validateTeacherCreation.validate(req.body)
    if(error){
        errorResponse.message = error.message
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result, err} = await teacherService.existingUser({email: value.email})
        if(err){
            errorResponse.error = err
            return res(status.SERVER_ERROR).json(errorResponse)
        }
        console.log(result)
        if(result.exists){
            errorResponse.message = "Email already registered"
            return res.status(status.BAD_REQUEST).json(errorResponse)
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

    const {result, err} = teacherService.existingTeacher({registered_batch_number: value.batchNumber})
    if(err){
        errorResponse.error = err
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }

    if(!result || resultlength === 0) {
            errorResponse.message = "No such teacher exists"
        return res.status(status.BAD_REQUEST).json(errorResponse)
        }

    req.teacherId = result.teacher_id
    req.collegeId = result.college_id
    next()
}

module.exports = {
    validateTeacherCreate,
    validateRegisterTeacher
}