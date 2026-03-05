const departmentValidations = require("../validations/department")
const departmentService = require('../service/department')
const { status } = require("../utils/constants")

const validateStreamCreation = (req, res, next) => {
    const collegeId = req.collegeId
    const {value, error} = departmentValidations.registerDepartment.validate(req.body)
    if(error) {
        errorResponse.message = error.message
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result: stream, err: streamError, status: stat} = departmentService.validStreamExists({stream_id: value.streamId})
    if(streamError)
        return res.status(stat).json(streamError)

    const {result: isExistingCourse, err: courseError} = departmentService.validCourseExists({course_id: stream.course_id, college_id: collegeId})
    if(courseError){
        errorResponse.error = courseError
        return res(status.SERVER_ERROR).json(errorResponse)
    }
    if(!isExistingCourse){
        errorResponse.message = "No such course exists"
        return res(status.NOT_FOUND).json(errorResponse)
    }


    const {result: isExistingDepartment, err: departmentError} = departmentService.departmentAlreadyExists({stream_id, department_code})
    if(departmentError){
        errorResponse.error = departmentError
        return res(status.SERVER_ERROR).json(errorResponse)
    }
    if(isExistingDepartment){
        errorResponse.message = "Department already exists exists"
        return res(status.BAD_REQUEST).json(errorResponse)
    }

    req.departmentData = value
    next()
}