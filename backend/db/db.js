const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'college_management',
    password: process.env.DB_PASSWORD,
    port: 5432,
})

const dbQuery = async (text, params) => {
    try {
        const res = await pool.query(text, params);
        return res;
    } catch (error) {
        throw error;
    }
}

module.exports = dbQuery;