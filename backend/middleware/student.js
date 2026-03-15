const studentService = require("../service/student")
const { status, roles } = require("../utils/constants")
const { errorResponse } = require("../utils/response")
const validateStudent = require("../validations/student")

const registerStudent = async (req, res, next) => {
    const collegeId = req.collegeId
    const {value, error} = validateStudent.validateStudentCreation.validate(req.body)
    if(error){
        errorResponse.message = error.message
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result, err} = await studentService.existingUser(value.email)
    if(err){
        errorResponse.error = err
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    if(result.exists){
        errorResponse.message = "Email already registered"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result: classes, err: classError} = await studentService.getStreamFromClass({class_id: value.classId})
    if(classError){
        errorResponse.error = courseError
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    const {result: course, err: courseError} = await studentService.getCollegeFromStream({stream_id: classes.stream_id})
    if(courseError){
        errorResponse.error = courseError
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    if(course.college_id !== collegeId){
        console.log(collegeId)
        errorResponse.message = "Course not exists on your college"
        return res.status(status.NOT_FOUND).json(errorResponse)
    }

    // if(value.role !== roles.STUDENT){
    //     errorResponse.message = "Invalid role credentials"
    //     return res.status(status.BAD_REQUEST).json(errorResponse)
    // }

    req.studentData = {streamId: classes.stream_id , ...value}
    next()
}

const studentRegisters = async (req, res, next) => {
    const {value, error} = validateStudent.validateStudentRegistration.validate(req.body)
    if(error){
        errorResponse.message = error.message
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result, err} = await studentService.existingStudent({enrollment_number: value.enrollmentNumber, registered_roll_number: value.rollNumber})
    if(err) {
        errorResponse.error = err
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    console.log(result);
    
    if(!result || result.length === 0) {
        errorResponse.message = "Student does not Exists"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }
    console.log(result);
    
    req.studentId = result.student_id
    req.collegeId = result.college_id
    console.log("Student Middleware done");
        console.log("Started controller",{student:req.studentId, college:req.collegeId})
    next()
}

module.exports = {
    registerStudent,
     studentRegisters
}