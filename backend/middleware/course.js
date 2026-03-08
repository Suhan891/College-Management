const courseService = require("../service/course")
const { status } = require("../utils/constants")
const { errorResponse } = require("../utils/response")
const courseValidation = require("../validations/course")

const validateCreateCourse = async (req, res, next) => {
    const collegeId = req.collegeId
    const {error, value} = courseValidation.registerCourse.validate(req.body)
    if(error) {
        errorResponse.message = error.details[0].message.replace(/"/g, "")
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }
    const {result, err} = await courseService.checkExists({courseCode: value.course_code, collegeId})
    if(err){
        errorResponse.error = err
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    if(result.exists){
        errorResponse.message = "Course already exists"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    req.courseData = value
    next()
}

module.exports = {
    validateCreateCourse
}