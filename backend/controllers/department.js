const departmentService = require('../service/department')
const { status } = require('../utils/constants')
const { errorResponse } = require('../utils/response')

const createDepartment = async (req, res) => {
    const departmentData = req.departmentData

    try {
        const {err, result} = await departmentService.createDepartment({
            stream_id: departmentData.streamId,
             department_name: departmentData.departmentName,
              department_code: departmentData.departmentCode,
               hod: departmentData.hod
            })
        if(err){
            errorResponse.error = err
            return res.status(status.SERVER_ERROR).json(errorResponse)
        }

        const departmentId = result.department_id
        
        successResponse.message = "New Department Created"
        successResponse.data = { departmentId, ...departmentData}

        return res.status(status.SUCCESS).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
}

module.exports = {
    createDepartment
}