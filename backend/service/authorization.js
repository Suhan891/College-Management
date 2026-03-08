const dbQuery = require("../db/db")
const { status } = require("../utils/constants")
const { errorResponse } = require("../utils/response");

const validateUserId = async ({user_id}) => {
    const query = `SELECT user_id, role, tokenVersion
                    FROM users 
                    WHERE user_id =  $1`;
    const value = [user_id]
    try {
        const result = await dbQuery(query, value)
        return { result: result.rows[0], err: null }
    } catch (error) {
        console.log("From Db", error)
        return {result: null, err: error}
    }
} 

const checkCollegHead = async ({creator}) => {
    const query = `SELECT college_id
                   FROM colleges
                   WHERE creator = $1`
    const value = [creator]
    try {
        const result = await dbQuery(query, value)
        console.log("From db",result)
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
const checkCollegeRole = async (userId) => {
    const query = `SELECT college_id
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

const checkStudentRole = async (userId) => {
    const query = `SELECT college_id
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
const checkTeacherRole = async (userId) => {
    const query = `SELECT college_id
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

const checkStreamHead = async (userId) => {
    const query = `SELECT EXISTS (
                    SELECT 1 
                    FROM streams 
                    WHERE hod = $1     -- Condition 1
                );`
    const value = [userId]
    try {
        const result = await dbQuery(query, value)
        if(result.rows.length === 0) {
            errorResponse.message = "You are not Hod to access Stream"
            return {result: null, err: errorResponse, status: status.NOT_FOUND};
        }
        return { result: result.rows[0], err: null, status: null }
    } catch (error) {
        errorResponse.error = error
        return {result: null, err: errorResponse, status: status.SERVER_ERROR}
    }
}
const checkDepartmentHead = async (userId) => {
    const query = `SELECT EXISTS (
                    SELECT 1 
                    FROM departments 
                    WHERE hod = $1     -- Condition 1
                );`
    const value = [userId]
    try {
        const result = await dbQuery(query, value)
        if(result.rows.length === 0) {
            errorResponse.message = "You are not Hod to access Department"
            return {result: null, err: errorResponse, status: status.NOT_FOUND};
        }
        return { result: result.rows[0], err: null, status: null }
    } catch (error) {
        errorResponse.error = error
        return {result: null, err: errorResponse, status: status.SERVER_ERROR}
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
        if(result.rows.length === 0) {
            errorResponse.message = "You are not Class Teacher to access Class"
            return {result: null, err: errorResponse, status: status.NOT_FOUND};
        }
        return { result: result.rows[0], err: null, status: null }
    } catch (error) {
        errorResponse.error = error
        return {result: null, err: errorResponse, status: status.SERVER_ERROR}
    }
}
module.exports = {
    validateUserId,
    checkCollegHead,
    checkCollegeRole,
    checkTeacherRole,
    checkStudentRole,

    checkStreamHead,
    checkDepartmentHead,
    checkClassTeacher
}