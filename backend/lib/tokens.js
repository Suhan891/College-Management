const jwt = require('jsonwebtoken');
const collegeRegistration = ({collegeId,sub, role}) => {
    const payload = {
        collegeId,
        sub,
        role
    }
    const token = jwt.sign(payload, process.env.COLLEGE_REGISTER_SECRET, { expiresIn: '24h' });
    return token;
}   

const verifyCollegeRegistrationToken = (token) => {
        const decoded = jwt.verify(token, process.env.COLLEGE_REGISTER_SECRET);
        return decoded;
    }


const createRefreshToken = (payload) => {
    const refreshToken = jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d'}
    )
    return refreshToken
} 
const createAccessToken = (payload) => {
    const accessToken = jwt.sign(
        payload,
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '30m' }
    )
    return accessToken
}

const verifyRefreshToken = (token) => {
    const refreshData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
    return refreshData
}
const verifyAccessToken = (token) => {
    if (!token || typeof token !== 'string') return null

    // JWTs should have exactly 3 parts separated by '.'
    const parts = token.split('.')
    if (parts.length !== 3) return null

    try {
        const accessData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        return accessData;
    } catch (err) {
        // Invalid token (malformed/expired/invalid signature)
        return null
    }
}

const createRolesToken = (payload) => {
    const rolesToken = jwt.sign(
        payload,
        process.env.JWT_ROLES_SECRET,
        { expiresIn: '24h' }
    )
    return rolesToken
}
const verifyRolesToken = (token) => {
    const rolesData = jwt.verify(token, process.env.JWT_ROLES_SECRET)
    return rolesData
}

module.exports = {
    collegeRegistration,
    verifyCollegeRegistrationToken,
    createRefreshToken,
     createAccessToken,
      verifyAccessToken,
       verifyRefreshToken,
       createRolesToken,
        verifyRolesToken
}