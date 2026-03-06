const dbQuery = require('../db/db')

// Subject table
const existingSubject = async ({department_id, subject_name}) => {
    const query = `SELECT EXISTS(
                    SELECT 1
                    FROM subjects
                    WHERE department_id = $1
                    AND subject_name = $2)`
    const values = [department_id, subject_name]
    try {
        const result = await dbQuery(query, values)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}
const getCollegeId = async ({department_id}) => {  // For subject
    const query = `SELECT c.college_id
                    FROM departments d
                    JOIN streams s ON s.stream_id = d.stream_id
                    JOIN courses c ON c.course_id = s.course_id
                    WHERE d.department_id = $1`
    const value = [department_id]
    try {
        const result = await dbQuery(query, value)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}
const createSubject = async ({department_id, subject_name}) => {
    const query = `INSERT INTO subjects(department_id, subject_name)
                    VALUES ($1, $2, $3)
                    RETURNING subject_id`
    const values = [department_id, subject_name]
    try {
        const result = await dbQuery(query, values)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}


// Subject Class Table
const existingSubjectClass = async ({class_id, subject_id, teacher_id}) => {
    const query = `SELECT EXISTS(
                    SELECT 1
                    FROM class_subjects
                    WHERE class_id = $1
                    AND subject_id = $2
                    AND teacher_id = $3)`
    const values = [class_id, subject_id, teacher_id]
    try {
        const result = await dbQuery(query, values)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}
const getDepartmentFromSubject = async ({subject_id}) => {
    const query = `SELECT department_id
                    FROM subjects
                    WHERE subject_id = $1`
    const value = [subject_id]
    try {
        const result = await dbQuery(query, value)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}
const getDepartmentFromTeacher = async ({teacher_id}) => {
    const query = `SELECT department_id
                    FROM teachers
                    WHERE teacher_id = $1`
    const value = [teacher_id]
    try {
        const result = await dbQuery(query, value)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}
const getCollegeFromClass = async ({class_id}) => {
    const query = `SELECT c.college_id
                    FROM classes cls
                    JOIN streams s ON s.stream_id = cls.stream_id
                    JOIN courses c ON c.course_id = s.course_id
                    WHERE cls.class_id = $1`
    const value = [department_id]
    try {
        const result = await dbQuery(query, value)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}
const createSubjectClass = async ({class_id, subject_id, teacher_id}) => {
    const query = `INSERT INTO class_subjects (class_id, subject_id, teacher_id)
                    VALUES (class_id, subject_id, teacher_id)
                    RETURNING class_subject_id`
    const values = [class_id, subject_id, teacher_id]
    try {
        const result = await dbQuery(query, values)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}

module.exports = {
    existingSubject,
    getCollegeId,
    createSubject,

    existingSubjectClass,
    getDepartmentFromSubject,
    getDepartmentFromTeacher,
    getCollegeFromClass,
    createSubjectClass
}
