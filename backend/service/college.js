const dbQuery = require("../db/db")
// College Registration
const existingUser = async ({email}) => {
    const query = `SELECT EXISTS(
                    SELECT 1
                    FROM users
                    WHERE email = $1)`
    const value = [email]
    try {
        const result = await dbQuery(query, value)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}
// const existingCollege = async ({creator}) => {
//     const query = `SELECT EXISTS(
//                     SELECT 1
//                     FROM colleges
//                     WHERE creator = $1)`
//     const value = [creator]
//     try {
//         const result = await dbQuery(query, value)
//         return {result, err: null}
//     } catch (error) {
//         return {result: null, err: error}
//     }
// }
const createUser = async ({name,email,password,role}) => {
    const query = `INSERT INTO users(name, email, password,  role, name)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING user_id`
    const values = [name, email,password, role, name]
    try {
        const result = await dbQuery(query, values)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}
const createCollege = async ({college_name, college_logo, established_year, creator}) => {
    console.log({college_name, college_logo, established_year, creator})
    const query = `INSERT INTO colleges (college_name, college_logo, established_year, creator)
         VALUES ($1, $2, $3, $4) RETURNING college_id`;
    const values = [college_name, college_logo, established_year, creator];
    try {
        const result = await dbQuery(query, values)
        return {result: result.rows[0], err: null}
    } catch (error) {
        console.log(error)
        return {result: null, err: error}
    }
}

//After email Verification 
const isUser = async ({user_id}) => {
    const query = `SELECT is_Email_verified, role
                    FROM users
                    WHERE user_id = $1`
    const value = [user_id]
    try {
        const result = await dbQuery(query, value)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}
const creatorFromCollege = async ({college_id}) => {
    const query = `SELECT creator
                    FROM colleges
                    WHERE college_id = $1`
    const value = [college_id]
    try {
        const result = await dbQuery(query, value)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}
const updateUser = async ({user_id, is_Email_verified, date_of_birth}) => {
    const query = `UPDATE users
                   SET is_Email_verified = $1,
                       date_of_birth = $2,
                       updated_at = CURRENT_TIMESTAMP
                   WHERE user_id = $3
                   RETURNING user_id`;
    const values = [is_Email_verified, date_of_birth, user_id];
    try {
        const result = await dbQuery(query, values)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: error}
    }
}
// Adress -> Also created on email verification
const existingAdress = async ({college_id, latitude, longitude}) => {
    const query = `SELECT EXISTS (
                    SELECT 1
                    FROM address
                    WHERE college_id = $1
                    AND latitude = $2
                    AND longitude = $3)`
    const values = [college_id, latitude, longitude]
    try {
        const result = await dbQuery(query, values)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result:  null, err: null}
    }
}
const createAdress = async ({college_id, latitude, longitude, location, city, state, country, pincode}) => {
    const query = `INSERT INTO address (college_id, latitude, longitude, location, city, state, country, pincode)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                    RETURNING address_id`
    const values = [college_id, latitude, longitude, location, city, state, country, pincode]
    try {
        const result = await dbQuery(query, values)
        console.log("From Db: ",result)
        return {result: result.rows[0], err: null}
    } catch (error) {
    console.log("From Db: ",error)
        return {result: null, err: null}
    }
}

// Calender
const existingCalender = ({college_id, academic_session}) => {
    const query = `SELECT EXISTS (
                    SELECT 1
                    FROM adress
                    WHERE college_id = $1
                    AND academic_session = $2`
    const values = [college_id, academic_session]
    try {
        const result = dbQuery(query, values)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result:  null, err: null}
    }
}
const createCalender = ({college_id, academic_session, start_date, working_days, end_date }) => {
    const query = `INSERT INTO calender (college_id, academic_session, start_date, working_days, end_date )
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING calender_id`
    const values = [college_id, academic_session, start_date, working_days, end_date ]
    try {
        const result = dbQuery(query, values)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: null}
    }
}

// Special Date
const existingSpecialDate = ({calender_id, specific_date}) => {
    const query = `SELECT EXISTS (
                    SELECT 1
                    FROM calendar_day_exception
                    WHERE day_exceptions_id = $1
                    AND specific_date = $2`
    const values = [calender_id, specific_date]
    try {
        const result = dbQuery(query, values)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result:  null, err: null}
    }
}
const calenderExists = ({calender_id, college_id}) => {
    const query = `SELECT EXISTS (
                    SELECT 1
                    FROM academic_calenders
                    WHERE calender_id = $1
                    AND college_id = $2`
    const values = [calender_id, college_id]
    try {
        const result = dbQuery(query, values)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result:  null, err: null}
    }
}
const createSpecialDate = ({day_exceptions_id, specific_date, day_status, reason}) => {
    const query = `INSERT INTO calender_day_exception (day_exceptions_id, specific_date, day_status, reason)
                    VALUES ($1, $2, $3, $4)
                    RETURNING day_exceptions_id`
    const values = [day_exceptions_id, specific_date, day_status, reason]
    try {
        const result = dbQuery(query, values)
        return {result: result.rows[0], err: null}
    } catch (error) {
        return {result: null, err: null}
    }
}

module.exports = {
    existingUser,
    createUser,
    //existingCollege, -> If the user would not exist how will creator link with college
    createCollege,

    isUser,
    creatorFromCollege,
    updateUser,
    existingAdress,
    createAdress,

    existingCalender,
    createCalender,

    existingSpecialDate,
    calenderExists,
    createSpecialDate
}