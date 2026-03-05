const { status } = require("../utils/constants")
const streamValidations = require("../validations/stream")
const streamService = require('../service/stream')
// streamCode: Joi.string().required(),
//     courseId
const validateStreamCreation = (req, res, next) => {
    const collegeId = req.collegeId
    const {value, error} = streamValidations.registerClass.validate(req.body)
    if(error) {
        errorResponse.message = error.message
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }
// const {result: stream, err: streamError, status: stat} = departmentService.validStreamExists({enrollment_number: value.enrollmentNumber, registered_roll_number: value.rollNumber})
//     if(streamError)
//         return res.status(stat).json(streamError)
    const {result: course, err: courseError} = streamService.validCourseExists({course_id: value.courseId, college_id: collegeId})
    if(courseError){
        errorResponse.error = courseError
        return res(status.SERVER_ERROR).json(errorResponse)
    }
    if(!isExistingCourse){
        errorResponse.message = "No such course exists"
        return res(status.NOT_FOUND).json(errorResponse)
    }

    const {result: isExistingStream, err: streamError} = streamService.streamAlreadyExists({course_id: value.courseCode, stream_code: value.streamCode})
    if(streamError){
        errorResponse.error = streamError
        return res(status.SERVER_ERROR).json(errorResponse)
    }
    if(isExistingStream){
        errorResponse.message = "Stream already exists"
        return res(status.BAD_REQUEST).json(errorResponse)
    }


    req.streamData = value
    next()
}

module.exports = {
    validateStreamCreation
}