const dbQuery = require("../db/db");
const { status } = require("../utils/constants");
//     enrollment_number INT NOT NULL,
//     registered_roll_number INT NOT NULL,
//     session VARCHAR(100),

//     current_year INT,
//     current_semester INT,
//     current_roll VARCHAR(5),

//     class_id
const existingUser = async (email) => {
    const query = `SELECT EXISTS (
                    SELECT 1 
                    FROM users 
                    WHERE email = $1
                );`;
    const value = [email]
    try {
        const result = await dbQuery(query, value)
        return {result, err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}
const createStudent = async ({ college_id, enrollment_number, registered_roll_number, session, current_year, current_semester, current_roll, class_id, student_id}) => {
    const query = `INSERT INTO students (college_id, enrollment_number, registered_roll_number, session, current_year, current_semester, current_roll, class_id, student_id)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                    RETURNING student_id;`
    const values = [college_id, enrollment_number, registered_roll_number, session, current_year, current_semester, current_roll, class_id, student_id]
    try {
        const result = await dbQuery(query, values)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}

const existingStudent = async ({enrollment_number, registered_roll_number}) => {
    const query = `SELECT student_id, college_id
                   FROM students
                   WHERE enrollment_numbe = $1 
                   AND registered_roll_number = $2`
    const values = [enrollment_number, registered_roll_number]
    try {
        const result = await dbQuery(query, values)
        if(result.rows.length === 0) {
            errorResponse.message = "You are not authorized to access"
            return {result: null, err: errorResponse, status: status.NOT_FOUND};
        }
        return { result: result.rows[0], err: null, status: null }
    } catch (error) {
        errorResponse.error = error
        return {result: null, err: errorResponse, status: status.SERVER_ERROR}
    }
}

const findUser = async (studentId) => {
    const query = `SELECT email, name, isEmailVerified, role, user_id
                    FROM users
                    WHERE user_id = $1`
    const value = [studentId]
    try {
        const result = await dbQuery(query, value)
        return {result: result.rows[0], err: null}
    } catch (error) {
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
    createStudent,
    existingStudent,
    findUser,
    getCollege
}