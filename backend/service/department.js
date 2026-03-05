const dbQuery = require("../db/db")
const { status } = require("../utils/constants")

const validStreamExists = async ({ stream_id}) => {
    const query = `SELECT course_id
                    FROM streams 
                    WHERE stream_id = $1     -- Condition 1
                `
    const values = [stream_id]
    try {
        const result = await dbQuery(query, values)
        if(result.rows.length === 0) {
            errorResponse.message = "No such Stream exists"
            return {result: null, err: errorResponse, status: status.NOT_FOUND};
        }
        return { result: result.rows[0], err: null, status: null }
    } catch (error) {
        errorResponse.error = error
        return {result: null, err: errorResponse, status: status.SERVER_ERROR}
    }
}

const validCourseExists = async ({ course_id, college_id}) => {
    const query = `SELECT EXISTS (
                    SELECT 1 
                    FROM courses 
                    WHERE course_id = $1     -- Condition 1
                    AND college_id = $2  -- Condition 2
                );`
    const values = [course_id,college_id]
    try {
        const result = await dbQuery(query, values)
        return {result, err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}

const departmentAlreadyExists = async ({ stream_id, department_code }) => {
    const query = `SELECT EXISTS (
                    SELECT 1 
                    FROM departments
                    WHERE stream_id = $1     -- Condition 1
                    AND department_code = $2  -- Condition 2
                );`
    const values = [stream_id, department_code]
    try {
        const result = await dbQuery(query, values)
        return {result, err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}

const createDepartment = async ({stream_id, department_name, department_code, hod}) => {
    const query = `INSERT INTO departments (stream_id, department_name, department_code, hod)
                    VALUES ($1, $2, $3, $4)
                    RETURNING department_id;`
    const values = [stream_id, department_name, department_code, hod]
    try {
        const result = await dbQuery(query, values)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}

module.exports = {
    validStreamExists,
    validCourseExists,
    departmentAlreadyExists,
    createDepartment
}