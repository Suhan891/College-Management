const jwt = require('jsonwebtoken');
const collegeRegistration = (collegeId,email, role) => {
    const payload = {
        collegeId,
        role
    }
    const token = jwt.sign(payload, process.env.COLLEGE_REGISTER_SECRET, { expiresIn: '24h' });
    return token;
}   

const verifyCollegeRegistrationToken = (token) => {
        const decoded = jwt.verify(token, process.env.COLLEGE_REGISTER_SECRET);
        return decoded;
    }

    module.exports = {
        collegeRegistration,
        verifyCollegeRegistrationToken
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
    const accessData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    return accessData
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
    createRefreshToken,
     createAccessToken,
      verifyAccessToken,
       verifyRefreshToken,
       createRolesToken,
        verifyRolesToken
}