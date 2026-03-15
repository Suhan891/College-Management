const dbQuery = require("../db/db");
const { status } = require("../utils/constants");

const existingUser = async (email) => {
    const query = `SELECT EXISTS (
                    SELECT 1 
                    FROM users 
                    WHERE email = $1
                );`;
    const value = [email]
    try {
        const result = await dbQuery(query, value)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}
const getStreamFromClass = async ({class_id}) => {
    const query = `SELECT stream_id
                    FROM classes
                    WHERE class_id = $1`
    const value = [class_id]
    try {
        const result = await dbQuery(query, value)
        return { result: result.rows[0], err: null }
    } catch (error) {
        return {result: null, err: error}
    }
}
const getCollegeFromStream = async ({stream_id}) => {
    const query = `SELECT c.college_id
                    FROM courses c
                    JOIN streams s ON c.course_id = s.course_id
                    WHERE s.stream_id = $1`
    const value = [stream_id]
    try {
        const result = await dbQuery(query, value)
        return {result: result.rows[0], err: null}
    } catch (error) {
         console.log("From Course:",error)
        return {result: null, err: error}
    }
}
const createStudent = async ({ college_id, enrollment_number, registered_roll_number, session, current_year, current_semester, current_roll, class_id, stream_id, student_id}) => {
    const query = `INSERT INTO students (college_id, enrollment_number, registered_roll_number, session, current_year, current_semester, current_roll, class_id, stream_id, student_id)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                    RETURNING student_id;`
    const values = [college_id, enrollment_number, registered_roll_number, session, current_year, current_semester, current_roll, class_id,stream_id, student_id]
    try {
        const result = await dbQuery(query, values)
        console.log("From Student: ", result)
        return {result: result.rows[0], err: null}
    } catch (error) {
        console.log("From Student: ", error)
        return {result: null, err: error}
    }
}

const existingStudent = async ({enrollment_number, registered_roll_number}) => {
    const query = `SELECT student_id, college_id
                   FROM students
                   WHERE enrollment_number = $1 
                   AND registered_roll_number = $2`
    const values = [enrollment_number, registered_roll_number]
    try {
        const result = await dbQuery(query, values)
        return { result: result.rows[0], err: null }
    } catch (error) {
        return {result: null, err:error}
    }
}

const findUser = async ({user_id}) => {
    const query = `SELECT email, name, is_email_verified, role, user_id
                    FROM users
                    WHERE user_id = $1`
    const value = [user_id]
    try {
        const result = await dbQuery(query, value)
        return {result: result.rows[0], err: null}
    } catch (error) {
        console.log(error);
        
        return {result: result.rows[0], err: null}
    }
}

const getCollege = async (collegeId) => {
    const query = `SELECT college_name, college_logo
                    FROM colleges
                    WHERE college_id = $1`
    const value = [collegeId]
    try {
        const result = await dbQuery(query, value)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: result.rows[0], err: null}
    }
}

module.exports = {
    existingUser,
    getStreamFromClass,
    getCollegeFromStream,
    createStudent,

    existingStudent,
    findUser,
    getCollege
}