const studentService = require("../service/student")
const { status, roles } = require("../utils/constants")
const { errorResponse } = require("../utils/response")
const validateStudent = require("../validations/student")

const registerStudent = (req, res, next) => {
    const {value, error} = validateStudent.validateStudentCreation.validate(req.body)
    if(error){
        errorResponse.message = error.message
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result, err} = studentService.existingUser(value.email)
    if(err){
        errorResponse.error = err
        return res(status.SERVER_ERROR).json(errorResponse)
    }
    if(result){
        errorResponse.message = "Email already registered"
        return res(status.BAD_REQUEST).json(errorResponse)
    }

    if(value.role !== roles.STUDENT){
        errorResponse.message = "Invalid role credentials"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    req.studentData = value
    next()
}

const studentRegisters = (req, res, next) => {
    const {value, error} = validateStudent.validateStudentRegistration.validate(req.body)
    if(error){
        errorResponse.message = error.message
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result, err, status: stat} = studentService.existingStudent({enrollment_number: value.enrollmentNumber, registered_roll_number: value.rollNumber})
    if(err)
        return res.status(stat).json(err)

    req.studentId = result.student_id
    req.collegeId = result.college_id
    next()
}

module.exports = {
    registerStudent,
     studentRegisters
}