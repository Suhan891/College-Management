const dbQuery = require('../db/db')

// Time Slot
const existingTimeSlots = ({period_number, start_time, end_time}) => {
    const query = `SELECT EXISTS (
                    SELECT 1
                    FROM time_slots
                    WHERE period_number = $1
                    AND start_time = $2
                    AND end_time = $3)`
    const values = [period_number, start_time, end_time]
}
const createTimeSlots = ({college_id, period_number, start_time, end_time}) => {
    const query = `INSERT INTO time_slots (college_id, period_number, start_time, end_time)
                    VALUES ($1, $2, $3, $4)
                    RETURNING time_slot_id`
    const values = [college_id, period_number, start_time, end_time]
}

// Timetable Versioning
const existingTimeTableVersioning = ({stream_id, effective_from, effective_to}) => {
    const query = `SELECT EXISTS (
                    SELECT 1
                    FROM timetable_versions
                    WHERE stream_id = $1
                    AND effective_from = $2
                    AND effective_to = $3)`
    const values = [stream_id, effective_from, effective_to]
}
const getCollegeFromStream = ({stream_id}) => {
    const query = `SELECT c.college_id
                FROM timetable_versions t
                JOIN streams s ON s.stream_id = t.stream_id
                JOIN courses c ON c.course_id = s.course_id
                WHERE t.stream_id = $1`
    const value = [stream_id]
}
const createTimeTableVersioning = ({stream_id, effective_from, effective_to}) => {
    const query = `INSERT INTO timetable_versions (stream_id, effective_from, effective_to)
                    VALUES ($1, $2, $3)
                    RETURNING version_id`
    const values = [stream_id, effective_from, effective_to]
}

// Timetable
const existingTimeTable = ({time_slot_id, class_subject_id, day}) => {
    const query = `SELECT EXISTS (
                    SELECT 1
                    FROM timetable
                    WHERE time_slot_id = $1
                    AND class_subject_id = $2
                    AND day = $3)`
    const values = [time_slot_id, class_subject_id, day]

}
const getStreamFromTimetableVersion = ({version_id}) => {
    const query = `SELECT stream_id
                    FROM timetable_versions
                    WHERE version_id = $1`
    const value = [version_id]
}
const getStreamFromClassSubject = ({class_subject_id}) => {
    const query = `SELECT d.stream_id
                    FROM timetable t
                    JOIN class_subjects cs ON cs.class_subject_id = t.class_subject_id
                    JOIN classes c ON c.class_id = cs.class_id
                    WHERE t.class_subject_id = $1`
    const value = [class_subject_id]
}
const getCollegeFromtimeSlot = ({time_slot_id}) => {
    const query = `SELECT college_id
                    FROM time_slots
                    WHERE time_slot_id = $1`
    const value = [time_slot_id]
}
const createTimeTable = ({version_id, calender_id, class_subject_id, time_slot_id, day}) => {
    const query = `INSERT INTO timetable (version_id, calender_id, class_subject_id, time_slot_id, day)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING timetable_id`
    const values = [version_id, calender_id, class_subject_id, time_slot_id, day]
}

module.exports = {
    existingTimeSlots,
    createTimeSlots,

    existingTimeTableVersioning,
    getCollegeFromStream,
    createTimeTableVersioning,

    existingTimeTable,
    getStreamFromTimetableVersion,
    getStreamFromClassSubject,
    getCollegeFromtimeSlot,
    createTimeTable
}