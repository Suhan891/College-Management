const dbQuery = require('../db/db')
const { status } = require('../utils/constants')

// Attendance Session
const existingAttendanceSession = ({timetable_id, session_date}) => {
    const query = `SELECT EXISTS (
                    SELECT 1
                    FROM attendance_sessions
                    WHERE timetable_id = $1
                    AND session_date = $2);`
    const values = [timetable_id, session_date]
    try {
        const result = dbQuery(query, values)
        return {result, err: null}
    } catch (error) {
        return {result: null, err: null}
    }
}
const getTeacherFromTimetable = ({timetable_id}) => {
    const query = `SELECT cs.teacher_id
                FROM timetable t
                JOIN class_subjects cs ON cs.class_subject_id = t.class_subject_id
                WHERE t.timetable_id = $1`
    const value = [timetable_id]
    try {
        const result = dbQuery(query, value)
        return {result, err: null}
    } catch (error) {
        return {result: null, err: null}
    }
}
const getCollegeFromTimetable = ({timetable_id}) => {
    const query = `SELECT ts.college_id
                FROM timetable t
                JOIN time_slots ts ON ts.time_slot_id = t.time_slot_id
                JOIN academic_calendars ac ON ac.calendar_id = ts.calendar_id
                WHERE t.timetable_id = $1`
    const value = [timetable_id]
    try {
        const result = dbQuery(query, value)
        return {result, err: null}
    } catch (error) {
        return {result: null, err: null}
    }
}
const getCalenderFromTimetable = ({timetable_id}) => {
    const query = `SELECT ts.calender_id, ts.time_slot_id
                    FROM timetable t
                    JOIN time_slots ts ON ts.time_slot_id = t.time_slot_id
                    WHERE t.timetable_id = $1`
    const value = [timetable_id]
    try {
        const result = dbQuery(query, value)
        return {result, err: null}
    } catch (error) {
        return {result: null, err: null}
    }
}
const getCalender = ({calendar_id}) => {
    const query = `SELECT college_id, working_days
                    FROM academic_calendars
                    WHERE calender_id = $1
                    AND start_date < CURRENT_DATE
                    AND end_date > CURRENT_DATE`
    const value = [calendar_id]
    try {
        const result = dbQuery(query, value)
        return {result, err: null}
    } catch (error) {
        return {result: null, err: null}
    }
}
const getSpecialDate = ({day_exceptions_id, day_status}) => {
    const query = `SELECT EXISTS (  -- Return true or false
                    SELECT 1
                    FROM calendar_day_exception
                    WHERE day_exceptions_id = $1
                    AND specific_date = CURRENT_DATE
                    AND day_status = $2)`
    const values = [day_exceptions_id, day_status]
    try {
        const result = dbQuery(query, values)
        return {result, err: null}
    } catch (error) {
        return {result: null, err: null}
    }
} 
const validTimeSlot = ({time_slot_id}) => {
    const query = `SELECT EXISTS (
                    SELECT 1 
                    FROM time_slots 
                    WHERE time_slot_id = $1 
                    AND LOCALTIME BETWEEN start_time AND end_time
                );`
    const value = [time_slot_id]
    try {
        const result = dbQuery(query, value)
        return {result, err: null}
    } catch (error) {
        return {result: null, err: null}
    }
}
const createAttendanceSession = ({timetable_id, teacher, session_date, start_time, end_time}) => {
    const query = `INSERT INTO attendance_sessions (timetable_id, teacher, session_date, start_time, end_time)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING session_id`
    const values = [timetable_id, teacher, session_date, start_time, end_time]
    try {
        const result = dbQuery(query, values)
        return {result, err: null}
    } catch (error) {
        return {result: null, err: null}
    }
}


// Attendance
const existingAttendance = ({student_id, timetable_id, attendance_date}) => {
    const query = `SELECT EXISTS (
                    SELECT 1
                    FROM attendance
                    WHERE timetable_id = $1
                    AND attendance_date = $2
                    AND student_id = $3`
    const values = [timetable_id, attendance_date, student_id]
    try {
        const result = dbQuery(query, values)
        return {result, err: null}
    } catch (error) {
        return {result: null, err: null}
    }
}
const getClassFromStudent = ({student_id}) => {
    const query = `SELECT class_id
                    FROM students
                    WHERE student_id = $1`
    const value = [student_id]
    try {
        const result = dbQuery(query, value)
        return {result, err: null}
    } catch (error) {
        return {result: null, err: null}
    }
}
const getClassFromTimetable = ({timetable_id}) => {
    const query = `SELECT cs.class_id
                    FROM timetable t
                    JOIN class_subjects cs ON cs.class_subject_id = t.class_subject_id
                    WHERE t.timetable_id = $1`
    const value = [timetable_id]
    try {
        const result = dbQuery(query, value)
        return {result, err: null}
    } catch (error) {
        return {result: null, err: null}
    }
}
const getAttendanceSessionFromTimetable = ({timetable_id}) => {
    const query = `SELECT session_id, teacher
                    FROM attendance_sessions
                    WHERE timetable_id = $1`
    const value = [timetable_id]
    try {
        const result = dbQuery(query, value)
        return {result, err: null}
    } catch (error) {
        return {result: null, err: null}
    }
}
const checkClassTeacher = async (userId) => {
    const query = `SELECT EXISTS (
                    SELECT 1 
                    FROM classes 
                    WHERE class_teacher = $1     -- Condition 1
                );`
    const value = [userId]
    try {
        const result = await dbQuery(query, value)
        return { result: result.rows[0], err: null }
    } catch (error) {
        return {result: null, err: error}
    }
}
const getAdressFromTimetable = ({timetable_id}) => {
    const query = `SELECT a.college_id, a.longitude, a.latitude, a.college_radius
                    FROM timetable t 
                    JOIN class_subjects cs ON cs.class_subject_id = t.class_subject_id
                    JOIN classes c ON c.class_id = cs.class_id
                    JOIN adress a ON a.address_id = c.address_id
                    WHERE t.timetable_id = $1`
    const value = [timetable_id]
    try {
        const result = dbQuery(query, value)
        return {result, err: null}
    } catch (error) {
        return {result: null, err: null}
    }
}
const createAttendance = ({student_id, timetable_id, session_id,  marking_attendance, source_role}) => {
    const query = `INSERT INTO attendance(student_id, timetable_id, session_id,  marking_attendance, source_role)
                    VALUES ($1, $2, $3, $4, $5 )
                    RETURNING attendance_id`
    const values = [student_id, timetable_id, session_id,  marking_attendance, source_role]
    try {
        const result = dbQuery(query, values)
        return {result, err: null}
    } catch (error) {
        return {result: null, err: null}
    }
}

module.exports = {
    existingAttendanceSession,
    getTeacherFromTimetable,
    getCollegeFromTimetable,
    getCalenderFromTimetable,
    getCalender,
    getSpecialDate,
    validTimeSlot,
    createAttendanceSession,

    existingAttendance,
    getClassFromStudent,
    getClassFromTimetable,
    getAttendanceSessionFromTimetable,
    getAdressFromTimetable,
    checkClassTeacher,
    createAttendance
}