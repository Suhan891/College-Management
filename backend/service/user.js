const dbQuery = require("../db/db");
const { status } = require("../utils/constants");
const { errorResponse } = require("../utils/response")

const createUser = async ({name,email,role}) => {
    const query = `INSERT INTO users(name, email, role)
                    VALUES ($1, $2, $3)
                    RETURNING user_id`
    const values = [name, email, role]
    try {
        const result = await dbQuery(query, values)
        return {result: result.rows[0], err: null}
    } catch (error) {
        console.log(error)
        return {result: null, err: error}
    }
}

const findUser = async (email) => {
    const query = `SELECT user_id, role, name, is_Email_verified, password, tokenVersion
                    FROM users 
                    WHERE email =  $1`;
    const value = [email]
    try {
        const result = await dbQuery(query, value)
        return { result: result.rows[0], err: null }
    } catch (error) {
        errorResponse.error = error
        return {result: null, err: errorResponse, status: status.SERVER_ERROR}
    }
}
const validateUserId = async (userId) => {
    const query = `SELECT user_id, role, name, tokenVersion
                    FROM users 
                    WHERE user_id =  $1`;
    const value = [userId]
    try {
        const result = await dbQuery(query, value)
        console.log("From Db: ", result.rows[0])
        if(result.rows.length === 0) {
            errorResponse.message = "No such User Available"
            return {result: null, err: errorResponse, status: status.NOT_FOUND};
        }
        return { result: result.rows[0], err: null, status: null }
    } catch (error) {
        errorResponse.error = error
        return {result: null, err: errorResponse, status: status.SERVER_ERROR}
    }
} 

const findCollege = async (userId) => {
    const query = `SELECT college_id, creator, college_name, college_logo
                    FROM colleges
                    WHERE creator = $1 `
    const value = [userId]
    try {
        const result = await dbQuery(query, value)
        if(result.rows.length === 0) {
            errorResponse.message = "No such College Available"
            return {result: null, err: errorResponse, status: status.NOT_FOUND};
        }
        return { result: result.rows[0], err: null, status: null }

    } catch (error) {
        errorResponse.error = error
        return {result: null, err: errorResponse, status: status.SERVER_ERROR}
    }
}

const findStudent = async (userId) => {
    const query = `SELECT student_id, college_id, class_id
                    FROM students 
                    WHERE student_id =  $1`;
    const value = [userId]
    try {
        const result = await dbQuery(query, value)
        if(result.rows.length === 0) {
            errorResponse.message = "No such Student Available"
            return {result: null, err: errorResponse, status: status.NOT_FOUND};
        }
        return { result: result.rows[0], err: null, status: null }
    } catch (error) {
        errorResponse.error = error
        return {result: null, err: errorResponse, status: status.SERVER_ERROR}
    }
}
const findTeacher = async (userId) => {
    const query = `SELECT teacher_id, college_id, department_id
                    FROM teachers
                    WHERE teacher_id =  $1`;
    const value = [userId]
    try {
        const result = await dbQuery(query, value)
        if(result.rows.length === 0) {
            errorResponse.message = "No such Teacher Available"
            return {result: null, err: errorResponse, status: status.NOT_FOUND};
        }
        return { result: result.rows[0], err: null, status: null }
    } catch (error) {
        errorResponse.error = error
        return {result: null, err: errorResponse, status: status.SERVER_ERROR}
    }
}

// During Email verification of respective roles
const getUser = async (userId) => {
    const query = `SELECT user_id, roleis_Email_verified
                    FROM users 
                    WHERE user_id =  $1`;
    const value = [userId]
    try {
        const result = await dbQuery(query, value)
        if(result.rows.length === 0) {
            errorResponse.message = "No such User Available"
            return {result: null, err: errorResponse, status: status.NOT_FOUND};
        }
        return { result: result.rows[0], err: null, status: null }
    } catch (error) {
        errorResponse.error = error
        return {result: null, err: errorResponse, status: status.SERVER_ERROR}
    }
}

const createPassword = async ({password, isEmailVerified, date_of_birth}) => {
    const query = `INSERT INTO users (password, isEmailVerified, date_of_birth)
                    VALUES ($1, $2, $3)
                    RETURNING isEmailVerified;`
    const values = [password, isEmailVerified, dob]
    try {
        const result = await dbQuery(query, values)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}

module.exports = {
    createUser,
    findUser,
    findCollege,
    findTeacher,
    findStudent,
    validateUserId,
    getUser,
    createPassword
}