const attendanceService = require('../service/attendance')
const { status, dayStatus, roles } = require('../utils/constants')
const { errorResponse, successResponse } = require('../utils/response')
const haversine = require('haversine-distance')

const createAttendanceSession = async (req, res) => {
    const collegeId = req.collegeId
    const attendanceSessionData = req.attendanceSessionData
    const calenderId =  req.calenderId
    const userId = req.userId
    const timeSlotId = req.timeSlotId
    try {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const todayDay = days[new Date().getDay()]; // as new Date return 0-6

        const {result: calender, err: calenderErr} = attendanceService.getCalender({calender_id: calenderId})
        if(calenderErr) {
            errorResponse.error = calenderErr
            return res.status(status.SERVER_ERROR).json(errorResponse)
        }
        if(calender.length === 0) {
            errorResponse.message = "Calender expired please contact College to create a new Calender"
            return res.status(status.BAD_REQUEST).json(errorResponse)
        }
        if(calender.college_id !== collegeId) {
            errorResponse.message = "College Id not matching"
            return res.status(status.BAD_REQUEST).json(errorResponse)
        }

        // Required to check once more
        if(calender.working_days.includes(todayDay)) {
            const {result: specialDay, err: specialDayErr} = attendanceService.getSpecialDate({
                day_exceptions_id: calenderId,
                 day_status: dayStatus.HOLIDAY
            })
            if(specialDayErr) {
                errorResponse.error = specialDayErr
                return res.status(status.SERVER_ERROR).json(errorResponse)
            }

            if(specialDay) {
                errorResponse.message = "College Mentioned today as Holiday"
                return res.status(status.BAD_REQUEST).json(errorResponse)
            }
        } else {
            const {result: specialDay, err: specialDayErr} = attendanceService.getSpecialDate({
                day_exceptions_id: calenderId,
                 day_status: dayStatus.WORKING
            })
            if(specialDayErr) {
                errorResponse.error = specialDayErr
                return res.status(status.SERVER_ERROR).json(errorResponse)
            }
            if(!specialDay) {
                errorResponse.message = "This day is holiday for the college"
                return res.status(status.BAD_REQUEST).json(errorResponse)
            }
        }

        const {result: validTimePeriod, err: timeSlotErr} = attendanceService.validTimeSlot({time_slot_id: timeSlotId})
        if(timeSlotErr){
            errorResponse.error = timeSlotErr
            return res.status(status.SERVER_ERROR).json(errorResponse)
        }       
        if(!validTimePeriod) {
            errorResponse.message = "Your request is not within your period"
            return res.status(status.BAD_REQUEST).json(errorResponse)
        }

        const {err, result} = await timeTableService.createTimeSlots({
            timetable_id: attendanceSessionData.timetableId,
             teacher: userId,
              session_date: attendanceSessionData.sessionDate
            })
        if(err){
            errorResponse.error = err
            return res.status(status.SERVER_ERROR).json(errorResponse)
        }

        const sessionId = result.session_id
        
        successResponse.message = "Attendance Session Created"
        successResponse.data = { sessionId, ...attendanceSessionData}

        return res.status(status.SUCCESS).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
}

const createAttendance = async (req, res) => {
    const collegeId = req.collegeId
    const attendanceData = req.attendanceData
    const role = req.role
    const sessionId = req.sessionId

    try {
        const {result: adress, err: adressErr} = attendanceService.getAdressFromTimetable({timetable_id: attendanceData.timeTableId})
        if(adressErr) {
            errorResponse.error = adressErr
            return res.status(status.SERVER_ERROR).json(errorResponse)
        }

        if(adress.college_id !== collegeId) {
            errorResponse.message = "Your College Id is not matching"
            return res.status(status.BAD_REQUEST).json(errorResponse)
        }

        let data = {}
        let message = null
        if(role === roles.TEACHER) {
            const {result: attendance, err} = attendanceService.createAttendance({
                student_id: attendanceData.studentId,
                 timetable_id: attendanceData.timeTableId,
                  session_id: sessionId,
                   marking_attendance: attendanceData.status,
                    source_role: attendanceData.sourceRole
            })
            if(err){
                errorResponse.error = err
                return res.status(status.SERVER_ERROR).json(errorResponse)
            }

            data = data = {attendanceId: attendance.attendance_id, ...attendanceData}
            message = "Student's attendance marked"
        }
        if(role === roles.STUDENT) {
            const collegeLat = adress.latitude
            const collegeLong = adress.longitude
            const studentLat = attendanceData.latitude
            const studentLong = attendanceData.longitude

            const distance = haversine(collegeLat, collegeLong, studentLat, studentLong);

            if(distance <= adress.college_radius) {
                const {result: attendance, err} = attendanceService.createAttendance({
                student_id: attendanceData.studentId,
                 timetable_id: attendanceData.timeTableId,
                  session_id: sessionId,
                   marking_attendance: 'PRESENT',
                    source_role: attendanceData.sourceRole
                })
                if(err){
                    errorResponse.error = err
                    return res.status(status.SERVER_ERROR).json(errorResponse)
                }

                data = {attendanceId: attendance.attendance_id, ...attendanceData, status: 'PRESENT'}
                message = "Attendance marked Present"
            } else {
                const {result: attendance, err} = attendanceService.createAttendance({
                student_id: attendanceData.studentId,
                 timetable_id: attendanceData.timeTableId,
                  session_id: sessionId,
                   marking_attendance: 'ABSENT',
                    source_role: attendanceData.sourceRole
                })
                if(err){
                    errorResponse.error = err
                    return res.status(status.SERVER_ERROR).json(errorResponse)
                }

                data = {attendanceId: attendance.attendance_id, ...attendanceData, status: 'ABSENT'}
                message = "You are outside College Premises. You are marked absent"
            }
        }

        if(data.length === 0 || message === null) {
            errorResponse.message = "Verification not happening"
            return res.status(status.SERVER_ERROR).json(errorResponse)
        }

        successResponse.data = data
        successResponse.message = message
        return res.status(status.SUCCESS).json(successResponse)

    } catch (error) {
        errorResponse.error = error
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    
}

module.exports = {
    createAttendanceSession,
    createAttendance
}