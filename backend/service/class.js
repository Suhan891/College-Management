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
// const validClassVersion = async ({ version_id, college_id}) => {
//     const query = `SELECT EXISTS (
//                     SELECT 1 
//                     FROM classes 
//                     WHERE version_id = $1     -- Condition 1
//                     AND college_id = $2  -- Condition 2
//                 );`
//     const value = [version_id, college_id]
//     try {
//         const result = await dbQuery(query, value)
//         return {result, err: null}
//     } catch (error) {
//         return {result: null, err: error}
//     }
// }
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

// const ClassVersionAlreadyExists = async({college_id, effective_from, effective_to}) => {
//     const query = `SELECT EXISTS (
//                     SELECT 1 
//                     FROM class_versioning 
//                     WHERE college_id = $1     -- Condition 1
//                     AND effective_from = $2  -- Condition 2
//                     AND effective_to = $3
//                 );`
//     const values = [college_id, effective_from, effective_to]
//     try {
//         const result = await dbQuery(query, values)
//         return {result, err: null}
//     } catch (error) {
//         return {result: null, err: error}
//     }
// }  // Will be done later in middleware


// const createClassVersion = async ({ college_id, effective_from, effective_to, is_active }) => {
//     const query = `INSERT INTO class_versioning (college_id, effective_from, effective_to, is_active)
//                     VALUES ($1, $2, $3, $4)
//                     RETURNING class_version_id;`
//     const values = [college_id, effective_from, effective_to, is_active]
//     try {
//         const result = await dbQuery(query, values)
//         return {result: result.rows[0], err: null}
//     } catch (error) {
//         return {result: null, err: error}
//     }
// }

const createClass = async ({stream_id, class_name, class_teacher, academic_year}) => {
    const query = `INSERT INTO classes (stream_id, class_name, class_teacher, academic_year)
                    VALUES ($1, $2, $3, $4)
                    RETURNING class_id;`
    const values = [stream_id, class_name, class_teacher, academic_year]
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
    createClass
}