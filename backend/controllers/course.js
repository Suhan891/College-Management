const courseService = require("../service/course")
const { status } = require("../utils/constants")
const { successResponse, errorResponse } = require("../utils/response")

 
const createCourse = async (req, res) => {
    const collegeId = req.collegeId
    const courseData = req.courseData

    try {
        const {err, result} = await courseService.createCourse({
            course_name: courseData.course_name,
             course_code: courseData.course_code, 
             duration_years: courseData.duration_years, 
             total_semesters: courseData.total_semesters, 
             college_id: collegeId
            })
        if(err){
            errorResponse.error = err
            return res.status(status.SERVER_ERROR).json(errorResponse)
        }

        const courseId = result.course_id
        
        successResponse.message = "New Course Created"
        successResponse.data = { courseId, ...courseData}

        return res.status(status.SUCCESS).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
}

module.exports = {
    createCourse
}