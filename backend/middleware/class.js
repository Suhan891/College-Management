const { status } = require("../utils/constants")
const { errorResponse } = require("../utils/response")
const classValidations = require("../validations/class")
const classService = require("../service/class")


const validateClassCreation = (req, res, next) => {
    const collegeId = req.collegeId
    const {value, error} = classValidations.registerClass.validate(req.body)
    if(error) {
        errorResponse.message = error.message
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result: isExistingClass, err: classError} = classService.classAlreadyExists({ class_name: value.className, stream_id: value.streamId})
    if(classError){
        errorResponse.error = classError
        return res(status.SERVER_ERROR).json(errorResponse)
    }
    if(isExistingClass){
        errorResponse.message = "Class already exists"
        return res(status.BAD_REQUEST).json(errorResponse)
    }

    // This two has to be again created
    const {result: stream, err: streamError, status: stat} = classService.validStreamExists({stream_id: value.streamId})
    if(streamError)
        return res.status(stat).json(streamError)
    
    const {result: isExistingCourse, err: courseError} = classService.validCourseExists({course_id: stream.course_id, college_id: collegeId})
    if(courseError){
        errorResponse.error = courseError
        return res(status.SERVER_ERROR).json(errorResponse)
    }
    if(!isExistingCourse){
        errorResponse.message = "No such course exists for your College"
        return res(status.NOT_FOUND).json(errorResponse)
    }

    const {err: adressErr, result: adress} = classService.getCollegeFromAdress({adress_id: value.adressId})
    if(adressErr) {
        errorResponse.error = adressErr
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }

    if(adress.college_id !== collegeId) {
        errorResponse.message = "No such Adress Exists for your College"
        return res(status.NOT_FOUND).json(errorResponse)
    }


    req.classData = value
    next()
}

module.exports = {
    validateClassVersioning,
    validateClassCreation
}
