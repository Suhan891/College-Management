const classService = require('../service/class')
const { status } = require('../utils/constants')
const { errorResponse, successResponse } = require('../utils/response')

const createClass = async (req, res) => {
    const classData = req.classData

    try {
        const {err, result} = await classService.createClass({
            stream_id: classData.streamId,
             class_name: classData.className,
              class_teacher: classData.classTeacher,
               academic_year: classData.academicYear,
                address_id: classData.adressId
            })
        if(err){
            errorResponse.error = err
            return res.status(status.SERVER_ERROR).json(errorResponse)
        }
        console.log("After Db")

        const classId = result.class_id
        
        successResponse.message = "New Class Created"
        successResponse.data = { classId, ...classData}

        return res.status(status.SUCCESS).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
}

module.exports = {
    createClass
}