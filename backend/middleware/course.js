const { checkExists } = require("../service/course")
const { status } = require("../utils/constants")
const { errorResponse } = require("../utils/response")
const { registerCourse } = require("../validations/course")

const validateCreateCourse = (req, res, next) => {
    const collegeId = req.collegeId
    const {error, value} = registerCourse.validate(req.body)
    if(error) {
        errorResponse.message = error.message
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }
    const {result, err} = checkExists({courseCode: value.course_code, collegeId})
    if(err){
        errorResponse.error = err
        return res(status.SERVER_ERROR).json(errorResponse)
    }
    if(result){
        errorResponse.message = "Course already exists"
        return res(status.BAD_REQUEST).json(errorResponse)
    }

    req.courseData = value
    next()
}

module.exports = {
    validateCreateCourse
}