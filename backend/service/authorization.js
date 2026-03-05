const dbQuery = require("../db/db")
const { status } = require("../utils/constants")

const checkCollegHead = async (userId) => {
    const query = `SELECT college_id
                   FROM colleges
                   WHERE creator = $1`
    const value = [userId]
    try {
        const result = await dbQuery(query, value)
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

module.exports = {
    checkCollegHead
}