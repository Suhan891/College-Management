const dbQuery = require("../db/db")

const classAlreadyExists = async ({ class_name, stream_id}) => {
    const query = `SELECT EXISTS (
                    SELECT 1 
                    FROM classes 
                    WHERE class_name = $1     -- Condition 1
                    AND stream_id = $2  -- Condition 2
                );`
    const values = [class_name,stream_id]
    try {
        const result = await dbQuery(query, values)
        return {result, err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}
 /*To get course id */
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

const getCollegeFromAdress = ({adress_id}) => {
    const query = `SELECT college_id
                    FROM adress
                    WHERE adress_id = $1`
    const value = [adress_id]
    try {
        const result = dbQuery(query, value)
        return {result, err: null}
    } catch (error) {
        return {result: null, err: null}
    }
}

const createClass = async ({stream_id, class_name, class_teacher, academic_year, adress_id}) => {
    const query = `INSERT INTO classes (stream_id, class_name, class_teacher, academic_year, adress_id)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING class_id;`
    const values = [stream_id, class_name, class_teacher, academic_year, adress_id]
    try {
        const result = await dbQuery(query, values)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}

module.exports = {
    validCourseExists,
    classAlreadyExists,
    validStreamExists,

    getCollegeFromAdress,
    createClass
}