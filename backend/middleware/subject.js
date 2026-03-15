const subjectService = require('../service/subject')
const { status } = require('../utils/constants')
const { errorResponse } = require('../utils/response')
const subjectValidation = require('../validations/subject')

const validateCreateSubject = async (req, res, next) => {
    const collegeId = req.collegeId
    const {error, value} = subjectValidation.registerSubject.validate(req.body)
    if(error) {
        errorResponse.message = error.message[0]
        res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result: isSubject, err: subjectError} = await subjectService.existingSubject({department_id: value.departmentId, subject_name: value.subjectName})
    if(subjectError) {
        errorResponse.error = subjectError
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    if(isSubject.exists) {
        errorResponse.message = "Subject already exists"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result: college, err: getCollegeError} = await subjectService.getCollegeId({department_id: value.departmentId})
    if(getCollegeError) {
        errorResponse.error = getCollegeError
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    console.log(college)

    if(college.college_id !== collegeId) {
        errorResponse.message = "College Not matching"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    req.subjectData = value
    next()
}

const validateCreateSubjectClass = async (req, res, next) => {
    const collegeId = req.collegeId
    const {error, value} = subjectValidation.registerSubjectClass.validate(req.body)
    if(error) {
        errorResponse.message = error
        res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result: college, err: classError} = await subjectService.getCollegeFromClass({class_id: value.classId})
    if(classError) {
        errorResponse.error = classError
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    if(college.college_id !== collegeId) {
        errorResponse.message = "College not matching"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result: isSubjectClass, err: subjectClassError} = await subjectService.existingSubjectClass({class_id: value.classId, subject_id: value.subjectId, teacher_id: value.subjectId})
    if(subjectClassError) {
        errorResponse.error = subjectClassError
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    if(isSubjectClass.exists) {
        errorResponse.message = "Teacher already exists on this subject on this class"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

        const {result: teacher, err: teacherError} = await subjectService.getDepartmentFromTeacher({teacher_id: value.teacherId})
    if(teacherError) {
        errorResponse.error = teacherError
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }

    const {result: subject, err: subjectError} = await subjectService.getDepartmentFromSubject({subject_id: value.subjectId})
    if(subjectError) {
        errorResponse.error = subjectError
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }

    if(teacher.department_id !== subject.department_id) {  
        errorResponse.message = "Teacher must from same department"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    req.subjectClassData = value
    console.log("Middleware done");
    
    next()
}

module.exports = {
    validateCreateSubject,
    validateCreateSubjectClass
}