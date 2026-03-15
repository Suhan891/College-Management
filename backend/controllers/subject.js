const subjectService = require('../service/subject')
const { status } = require('../utils/constants')
const { errorResponse, successResponse } = require('../utils/response')

const createSubject = async (req, res) => {
    const subjectData = req.subjectData

    try {
        const {err, result} = await subjectService.createSubject({
            department_id: subjectData.departmentId,
             subject_name: subjectData.subjectName
            })
        if(err){
            errorResponse.error = err
            return res.status(status.SERVER_ERROR).json(errorResponse)
        }
        console.log(result);
        

        const subjectId = result.subject_id
        
        successResponse.message = "New Subject Created"
        successResponse.data = { subjectId, ...subjectData}

        return res.status(status.SUCCESS).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
}

const createSubjectClass = async (req, res) => {
    const subjectClassData = req.subjectClassData

    try {
        const {result, err} = await subjectService.createSubjectClass({
            class_id: subjectClassData.classId,
             subject_id: subjectClassData.subjectId,
              teacher_id: subjectClassData.teacherId
            })
        if(err){
            errorResponse.error = err
            return res.status(status.SERVER_ERROR).json(errorResponse)
        }

        const subjectClassId = result.class_subject_id
        successResponse.message = "New Subject Class Created"
        successResponse.data = { subjectClassId, ...subjectClassData}

        return res.status(status.SUCCESS).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
}

module.exports = {
    createSubject,
    createSubjectClass
}