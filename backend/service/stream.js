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
        return {result: result.rows[0], err: null}
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
                console.log("Db from existing stream: ",result)
        return {result: result.rows[0], err: null}
    } catch (error) {
        console.log("Existing check from Db: ",error)
        return {result: null, err: error}
    }
}

const createStream = async ({course_id, stream_name, stream_code}) => {
    const query = `INSERT INTO streams (course_id, stream_name, stream_code)
                    VALUES ($1, $2, $3)
                    RETURNING stream_id;`
    const values = [course_id, stream_name, stream_code]
    try {
        const result = await dbQuery(query, values)
        console.log("Db create stream: ",result)
        return {result: result.rows[0], err: null}
    } catch (error) {
        console.log("Existing create from Db: ",error)
        return {result: null, err: error}
    }
}

const getStream = async ({college_id}) => {
    const query = `SELECT s.*
                    FROM streams s
                    JOIN coleges clg ON clg.college_id = c.college_id
                    JOIN streams s ON s.course_id = c.course_id
                    WHERE `
    const value = [college_id]
        try {
        const result = await dbQuery(query, value)
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
