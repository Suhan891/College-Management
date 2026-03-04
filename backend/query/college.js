
const registerCollegeQuery = async (college_id, college_name, college_logo, established_year, email, password) => {
    try {
        const query = `INSERT INTO colleges (college_id, college_name, college_logo, established_year, email, password)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const values = [college_id, college_name, college_logo, established_year, email, password];
        const result = await query(query, values);
        return {result: result.rows[0], error: null};
    } catch (error) {
        return {result: null, error};
    }
}

const getCollegeDetailsQuery = async (collegeId) => {
    try {
        const query = `SELECT * FROM colleges WHERE college_id = $1`;
        const values = [collegeId];
        const result = await query(query, values);
        if(result.rows.length === 0) {
            return {result: null, error: "College not found"};
        }
        return {result: result.rows[0], error: null};
    } catch (error) {
        return {result: null, error};
    }   
}

const makeAddressQuery = async (collegeId, city, state, country, pincode) => {
    try {
        const query = `INSERT INTO address (college_id, latitude, longitude,location, city, state, country, pincode) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [collegeId, city, state, country, pincode];
        const result = await query(query, values);
        return {result: result.rows[0], error: null};
    } catch (error) {
        return {result: null, error};
    }   
}

module.exports = {
    registerCollegeQuery,
    getCollegeDetailsQuery,
    makeAddressQuery
}