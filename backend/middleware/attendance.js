const validationAttendance = require('../validations/attendance')
const serviceAttendance = require('../service/attendance')
const { errorResponse } = require('../utils/response')
const { status, roles } = require('../utils/constants')

const createAttendanceSession = (req, res, next) => { // Later -> Also check from calender if today is a working day -> Will be done in controller
    const userId = req.userId
    const collegeId = req.collegeId

    const {error, value} = validationAttendance.registerAttendanceSession.validate(req.body)
    if(error) {
        errorResponse.message = error.message[0]
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {err: attdSessError, result: isAttdSess} = serviceAttendance.existingAttendanceSession({timetable_id: value.timetableId, session_date:sessionDate})
    if(attdSessError) {
        errorResponse.error = attdSessError
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    if(isAttdSess) {
        errorResponse.message = "Attendance session already exists"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {err: timeTableErr, result: teacher} = serviceAttendance.getTeacherFromTimetable({timetable_id: value.timeTableId})
    if(timeTableErr) {
        errorResponse.error = timeTableErr
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    if(teacher.teacher_id !== userId) {
        errorResponse.message = "You are not Authorized to Create"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {err: timeTableError, result: college} = serviceAttendance.getCollegeFromTimetable({timetable_id: value.timeTableId})
    if(timeTableError) {
        errorResponse.error = timeTableError
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    if(college.college_id !== collegeId) {
        errorResponse.message = "College Not matching"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {err: calenderErr, result: calender} = serviceAttendance.getCalenderFromTimetable({timetable_id: value.timeTableId})
    if(calenderErr) {
        errorResponse.error = calenderErr
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }

    req.calenderId = calender.calender_id
    req.timeSlotId = calender.time_slot_id

    req.attendanceSessionData = value
    next()
} 

const createAttendance = (req, res, next) => {

    const {error, value} = validationAttendance.registerAttendance.validate(req.body)
    if(error) {
        errorResponse.message = error.message[0]
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result:isAttendance, err} = serviceAttendance.existingAttendance({student_id: value.studentId, timetable_id: value.timeTableId, attendance_date: value.attendanceDate})
    if(err) {
        errorResponse.error = err
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    if(isAttendance) {
        errorResponse.message = "Attendance already created"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result: student, err: studentErr} = serviceAttendance.getClassFromStudent({student_id: value.studentId})
    if(studentErr) {
        errorResponse.error = studentErr
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    const {result: timetable, err: timetableErr} = serviceAttendance.getClassFromTimetable({timetable_id: value.timeTableId})
    if(timetableErr) {
        errorResponse.error = timetableErr
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    if(student.class_id !== timetable.class_id) {
        errorResponse.message = "Class Does not match"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result: session, err: sessionError} = serviceAttendance.getAttendanceSessionFromTimetable({timetable_id: value.timeTableId})
    if(sessionError) {
        errorResponse.error = sessionError
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    if(!session || session.length === 0) {
        errorResponse.message = "Session still not created"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

//    req.classId = timetable.class_id -> May be removed

    req.attendanceData = {sessionId: session.session_id, subjectTeacher: session.teacher, ...value}

    next()
}

const authorizeCreateAccess = (req, res, next) => {  // Check of role and also check of source Role
    const role = req.role
    const userId = req.userId
    const {sourceRole, timeTableId, subjectTeacher} = req.attendanceData

    if(role !== roles.STUDENT || role !== roles.TEACHER) {
        errorResponse.message = "Only teacher or student is allowed to access"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    if(sourceRole === 'TEACHER' || sourceRole === 'CLASS_TEACHER') {
        if(role !== roles.TEACHER) {
            errorResponse.message = "You are not the Subject or Class teacher to create"
            return res.status(status.BAD_REQUEST).json(errorResponse)
        }

        if(sourceRole === 'CLASS_TEACHER') {
            const {err, result} = serviceAttendance.checkClassTeacher(userId)
            if(err) {
                errorResponse.error = err
                return res.status(status.SERVER_ERROR).json(errorResponse)
            }

            if(!result) {
                errorResponse.message = "Your Role is not class teacher"
                return res.status(status.BAD_REQUEST).json(errorResponse)
            }
        } else if(sourceRole === 'TEACHER') {
            
            if(subjectTeacher !== userId) {
                errorResponse.message = "You are not Authorized to Create"
                return res.status(status.BAD_REQUEST).json(errorResponse)
            }
        }
    }

    if(sourceRole === STUDENT) {
        if(role !== roles.STUDENT) {
            errorResponse.message = "You are not the Student to create"
            return res.status(status.BAD_REQUEST).json(errorResponse)
        }
    }

    next()
}

module.exports = {
    createAttendanceSession,
     createAttendance,
     authorizeCreateAccess
}