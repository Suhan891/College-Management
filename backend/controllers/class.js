const classService = require('../service/class')
const { status } = require('../utils/constants')
const { errorResponse } = require('../utils/response')

const createClass = async (req, res) => {
    const classData = req.classData

    try {
        const {err, result} = await classService.createClass({
            stream_id: classData.streamId,
             class_name: classData.className,
              class_teacher: classData.classTeacher,
               academic_year: classData.academicYear,
                adress_id: classData.adressId
            })
        if(err){
            errorResponse.error = err
            return res.status(status.SERVER_ERROR).json(errorResponse)
        }

        const classId = result.class_id
        
        successResponse.message = "New Class Created"
        successResponse.data = { classId, ...result}

        return res.status(status.SUCCESS).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
}

module.exports = {
    createClass
}