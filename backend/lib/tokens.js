const jsonwebtoken = require('jsonwebtoken');
const collegeRegistration = (collegeId,email, role) => {
    const payload = {
        collegeId,

        role
    }
    const token = jsonwebtoken.sign(payload, process.env.COLLEGE_REGISTER_SECRET, { expiresIn: '24h' });
    return token;
}   

const verifyCollegeRegistrationToken = (token) => {
        const decoded = jsonwebtoken.verify(token, process.env.COLLEGE_REGISTER_SECRET);
        return decoded;
    }

    module.exports = {
        collegeRegistration,
        verifyCollegeRegistrationToken
    }