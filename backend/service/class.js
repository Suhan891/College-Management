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
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}
 /*To get course id */
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

const getAdressFromCollege = async ({college_id}) => {
    const query = `SELECT address_id
                    FROM address
                    WHERE college_id = $1`
    const value = [college_id]
    try {
        const result = await dbQuery(query, value)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: null}
    }
}

const createClass = async ({stream_id, class_name, class_teacher, academic_year, address_id}) => {
    const query = `INSERT INTO classes (stream_id, class_name, class_teacher, academic_year, address_id)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING class_id;`
    const values = [stream_id, class_name, class_teacher, academic_year, address_id]
    try {
        const result = await dbQuery(query, values)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}

module.exports = {
    classAlreadyExists,
    validStreamExists,
    getCollegeFromStream,

    getAdressFromCollege,
    createClass
}