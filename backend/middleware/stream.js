const { status } = require("../utils/constants")
const streamValidations = require("../validations/stream")
const streamService = require('../service/stream')
const { errorResponse } = require("../utils/response")
// streamCode: Joi.string().required(),
//     courseId
const validateStreamCreation = async (req, res, next) => {
    const collegeId = req.collegeId
    const {value, error} = streamValidations.registerStream.validate(req.body)
    if(error) {
        errorResponse.message = error.details[0].message.replace(/"/g, "")
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }
// const {result: stream, err: streamError, status: stat} = departmentService.validStreamExists({enrollment_number: value.enrollmentNumber, registered_roll_number: value.rollNumber})
//     if(streamError)
//         return res.status(stat).json(streamError)
    const {result: isExistingCourse, err: courseError} = await streamService.validCourseExists({course_id: value.courseId, college_id: collegeId})
    if(courseError){
        errorResponse.error = courseError
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    if(!isExistingCourse.exists){
        errorResponse.message = "No such course exists for your college"
        return res.status(status.NOT_FOUND).json(errorResponse)
    }

    const {result: isExistingStream, err: streamError} = await streamService.streamAlreadyExists({course_id: value.courseCode, stream_code: value.streamCode})
    if(streamError){
        errorResponse.error = streamError
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    if(isExistingStream.exists){
        errorResponse.message = "Stream already exists"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }


    req.streamData = value
    console.log("Stream Middleware done");
    
    next()
}

module.exports = {
    validateStreamCreation
}