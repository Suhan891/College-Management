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
        return {result, err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}

const createTeacher = async ({college_id, registered_batch_number, department_id, teacher_id}) => {
    const query = `INSERT INTO teachers (college_id, registered_batch_number, department_id, teacher_id)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING teacher_id;`
    const values = [college_id, registered_batch_number, department_id, teacher_id]
    try {
        const result = await dbQuery(query, values)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}

const existingTeacher = async ({registered_batch_number}) => {
    const query = `SELECT teacher_id, college_id
                   FROM teachers
                   WHERE registered_batch_number = $1`
    const values = [registered_batch_number]
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

const findUser = async (teacherId) => {
    const query = `SELECT email, name, isEmailVerified, role, user_id
                    FROM users
                    WHERE user_id = $1`
    const value = [teacherId]
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
    existingTeacher,
     createTeacher,
     findUser,
     getCollege
}