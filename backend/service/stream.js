const dbQuery = require("../db/db")

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
//course_id, stream_code
const streamAlreadyExists = async ({ course_id, stream_code}) => {
    const query = `SELECT EXISTS (
                    SELECT 1 
                    FROM streams
                    WHERE course_id = $1     -- Condition 1
                    AND stream_code = $2  -- Condition 2
                );`
    const values = [course_id, stream_code]
    try {
        const result = await dbQuery(query, values)
        return {result, err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}

const createStream = async ({course_id, stream_name, stream_code, hod}) => {
    const query = `INSERT INTO departments (course_id, stream_name, stream_code, hod)
                    VALUES ($1, $2, $3, $4)
                    RETURNING department_id;`
    const values = [course_id, stream_name, stream_code, hod]
    try {
        const result = await dbQuery(query, values)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}

module.exports = {
    validCourseExists,
    streamAlreadyExists,
    createStream
}
