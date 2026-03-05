const { status } = require("../utils/constants")
const { errorResponse } = require("../utils/response")
const classValidations = require("../validations/class")
const classService = require("../service/class")

// const validateClassVersioning = (req, res, next) => {
//     const {collegeId} = req.collegeId
//     const {value, error} = classService.versioningClass.validate(req.body)
//     if(error) {
//         errorResponse.message = error.message
//         return res.status(status.BAD_REQUEST).json(errorResponse)
//     }

//     const {result, err} = classService.ClassVersionAlreadyExists({college_id: collegeId, effective_from: value.effectiveFrom, effective_to: value.effectiveTo})
//     if(err){
//         errorResponse.error = err
//         return res(status.SERVER_ERROR).json(errorResponse)
//     }
//     if(result){
//         errorResponse.message = "Class Version already exists"
//         return res(status.BAD_REQUEST).json(errorResponse)
//     }

//     req.classVersionData = value
//     next()
// }

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

    // const {result: isExistingClassVersion, err: classVersionError} = classService.validClassVersion({version_id: value.versioId, college_id: collegeId})
    // if(classVersionError){
    //     errorResponse.error = classVersionError
    //     return res(status.SERVER_ERROR).json(errorResponse)
    // }
    // if(!isExistingClassVersion){
    //     errorResponse.message = "No such class version exists"
    //     return res(status.NOT_FOUND).json(errorResponse)
    // }
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

    req.classData = value
    next()
}

module.exports = {
    validateClassVersioning,
    validateClassCreation
}
