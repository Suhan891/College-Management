const departmentValidations = require("../validations/department")
const departmentService = require('../service/department')
const { status } = require("../utils/constants")
const { errorResponse } = require("../utils/response")

const validateDepartmentCreation = async (req, res, next) => {
    const collegeId = req.collegeId
    const {value, error} = departmentValidations.registerDepartment.validate(req.body)
    if(error) {
        errorResponse.message = error.details[0].message.replace(/"/g, "")
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result: stream, err: streamError} = await departmentService.validStreamExists({stream_id: value.streamId})
    if(streamError) {
        errorResponse.error = streamError
        return res.status(stat).json(errorResponse)
    }
    console.log("From backend: ",stream)
    if(!stream.exists) {
        errorResponse.message = "No such stream exists"
        return res.status(status.NOT_FOUND).json(errorResponse)
    }

    const {result: course, err: courseError} = await departmentService.getCollegeFromStream({stream_id: value.streamId})
    if(courseError){
        errorResponse.error = courseError
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    if(course.college_id !== collegeId){
        console.log(collegeId)
        errorResponse.message = "Course not exists on your college"
        return res.status(status.NOT_FOUND).json(errorResponse)
    }


    const {result: isExistingDepartment, err: departmentError} = await departmentService.departmentAlreadyExists({stream_id: value.streamId, department_code: value.departmentCode})
    if(departmentError){
        errorResponse.error = departmentError
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    console.log(isExistingDepartment)
    if(isExistingDepartment.exists){
        errorResponse.message = "Department already exists exists"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    req.departmentData = value
    console.log("Middleware done")
    next()
}

module.exports = {
    validateDepartmentCreation
}