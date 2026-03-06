const dbQuery = require('../db/db')

// Attendance Session
const existingAttendanceSession = ({timetable_id, session_date}) => {
    const query = `SELECT EXISTS (
                    SELECT 1
                    FROM attendance_sessions
                    WHERE timetable_id = $1
                    AND session_date = $2`
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
                WHERE t.timetable_id = $1`
    const value = [timetable_id]
    try {
        const result = dbQuery(query, value)
        return {result, err: null}
    } catch (error) {
        return {result: null, err: null}
    }
}
const createAttendanceSession = ({timetable_id, teacher, session_date, start_time, end_time}) => {
    const query = `INSERT INTO attendance_sessions (timetable_id, teacher, session_date, start_time, end_time)
                    VALUES (timetable_id, teacher, session_date, start_time, end_time)
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
    const query = `SELECT session_id
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
const createAttendance = ({student_id, timetable_id, session_id, attendance_date, marked_at, marking_attendance, source_role}) => {
    const query = `INSERT INTO attendance(student_id, timetable_id, session_id, attendance_date, marked_at, marking_attendance, source_role)
                    VALUES (student_id, timetable_id, session_id, attendance_date, marked_at, marking_attendance, source_role)
                    RETURNING attendance_id`
    const values = [student_id, timetable_id, session_id, attendance_date, marked_at, marking_attendance, source_role]
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
    createAttendanceSession,

    existingAttendance,
    getClassFromStudent,
    getClassFromTimetable,
    getAttendanceSessionFromTimetable,
    createAttendance
}