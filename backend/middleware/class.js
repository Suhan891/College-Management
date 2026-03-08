const { status } = require("../utils/constants")
const { errorResponse } = require("../utils/response")
const classValidations = require("../validations/class")
const classService = require("../service/class")


const validateClassCreation = async (req, res, next) => {
    const collegeId = req.collegeId
    const {value, error} = classValidations.registerClass.validate(req.body)
    if(error) {
        errorResponse.message = error.message
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result: isExistingClass, err: classError} = await classService.classAlreadyExists({ class_name: value.className, stream_id: value.streamId})
    if(classError){
        errorResponse.error = classError
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    console.log("Existing Class: ",isExistingClass)
    if(isExistingClass.exists){
        errorResponse.message = "Class already exists"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result: stream, err: streamError} = await classService.validStreamExists({stream_id: value.streamId})
    if(streamError) {
        errorResponse.error = streamError
        return res.status(stat).json(errorResponse)
    }
    console.log("From backend: ",stream)
    if(!stream.exists) {
        errorResponse.message = "No such stream exists"
        return res.status(status.NOT_FOUND).json(errorResponse)
    }

    const {result: course, err: courseError} = await classService.getCollegeFromStream({stream_id: value.streamId})
    if(courseError){
        errorResponse.error = courseError
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    if(course.college_id !== collegeId){
        console.log(collegeId)
        errorResponse.message = "Course not exists on your college"
        return res.status(status.NOT_FOUND).json(errorResponse)
    }

    const {err: addressErr, result: address} = await classService.getCollegeFromAdress({adress_id: value.adressId})
    if(addressErr) {
        errorResponse.error = addressErr
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    console.log(address)

    if(address.college_id !== collegeId) {
        errorResponse.message = "No such Adress Exists for your College"
        return res.status(status.NOT_FOUND).json(errorResponse)
    }


    req.classData = value
    next()
}

module.exports = {
    validateClassCreation
}
