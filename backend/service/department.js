const dbQuery = require("../db/db")
const { status } = require("../utils/constants")

const validStreamExists = async ({ stream_id}) => {
    const query = `SELECT exists(
                    SELECT 1
                    FROM streams 
                    WHERE stream_id = $1)     -- Condition 1
                `
    const values = [stream_id]
    try {
        const result = await dbQuery(query, values)
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
        console.log("From department exists: ", result)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}

const createDepartment = async ({stream_id, department_name, department_code}) => {
    const query = `INSERT INTO departments (stream_id, department_name, department_code)
                    VALUES ($1, $2, $3)
                    RETURNING department_id;`
    const values = [stream_id, department_name, department_code]
    try {
        const result = await dbQuery(query, values)
        return {result: result.rows[0], err: null}
    } catch (error) {
                                console.log("From department: ", error)
        return {result: null, err: error}
    }
}

module.exports = {
    validStreamExists,
    getCollegeFromStream,
    departmentAlreadyExists,
    createDepartment
}