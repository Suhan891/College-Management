const dbQuery = require("../db/db")

const checkExists = async ({courseCode, collegeId}) => {
    const query = `SELECT EXISTS (
                    SELECT 1 
                    FROM courses 
                    WHERE college_id = $1     -- Condition 1
                    AND course_code = $2  -- Condition 2
                );`
    const values = [collegeId, courseCode]
    try {
        const result = await dbQuery(query, values)
        return {result, err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}

//     course_name VARCHAR(100) NOT NULL,  -- B.Tech, M.Tech, MBA
//     course_code VARCHAR(20),
//     duration_years INT NOT NULL,        -- 4, 2, 3
//     total_semesters
const createCourse = async ({course_name, course_code, duration_years, total_semesters, college_id}) => {
    const query = `INSERT INTO courses (course_name, course_code, duration_years, total_semesters, college_id)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING course_id;`
    const values = [course_name, course_code, duration_years, total_semesters, college_id]
    try {
        const result = await dbQuery(query, values)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: error}
    }

}

const getCourse = async ({college_id}) => {
    const query = `SELECT *
                    FROM courses
                    WHERE college_id = $1`
    const value = [college_id]
        try {
        const result = await dbQuery(query, values)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}

module.exports = {
    checkExists,
    createCourse
}
