const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'student_management',
    password: process.env.DB_PASSWORD,
    port: 5432,
})

const query = async (text, params) => {
    try {
        const res = await pool.query(text, params);
        return res;
    } catch (error) {
        throw error;
    }
}

module.exports = query;