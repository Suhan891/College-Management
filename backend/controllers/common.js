const { createRefreshToken, createAccessToken } = require("../lib/tokens")
const { findCollege, findTeacher, findStudent, createPassword } = require("../service/user")
const { roles, status } = require("../utils/constants")
const { errorResponse, successResponse } = require("../utils/response")

// These has been added to have forgot password handle
    // tokenVersion: {
    //   type: Number,
    //   default: 0,
    // },
    // resetPasswordToken: {
    //   type: String,
    //   default: undefined,
    // },
    // resetPasswordExpires: {
    //   type: Date,
    //   default: undefined,
    // },

// Later also provide microsoft OAth Login

const login = async (req, res) => {
    try {
        const {user_id, role, name, is_Email_verified, email} = req.user
    
        if(!is_Email_verified){
            errorResponse.message = "Please verify your email to Login"
            return res.status(400).json(errorResponse)
        }

        let refreshData = null
        let accessData = null
        let data = {}

        if(role === roles.ADMIN){
            // Will be thought
    
        } else if(role === roles.COLLEGE) {
            const {result, err, status: stat} = await findCollege(user_id)
            if(err)
                return res.status(stat).json(err)

            refreshData = {sub: result.creator, college: result.colleg_id, tokenVersion: result.tokenVersion}

            accessData = {college_id: result.college_id, role, userId: result.creator} // access token 

            data = {...result, creator_name: name, role}

        } else if(role === roles.TEACHER) {
            const {result, err, status: stat} = await findTeacher(user_id)
            if(err)
                return res.status(stat).json(err)

            refreshData = {sub: user_id, tokenVersion: result.tokenVersion}

            accessData = {college_id: result.college_id, role, userId: user_id}

            data = { ...result, name, role}
        } else if(role === roles.STUDENT) {
            const {result, err, status: stat} = await findStudent(user_id)
            if(err)
                return res.status(stat).json(err)

            refreshData = {sub: user_id, tokenVersion: result.tokenVersion}

            accessData = {college_id: result.college_id, role, userId: user_id}

            data = { ...result, name, role}
        }

        const refreshToken = createRefreshToken(refreshData)
        res.cookie("refreshToken",refreshToken,{
                httpOnly: true,
                sameSite: "lax",
                secure: "production" === process.env.NODE_MODULES,
                maxAge: 7* 24* 60* 60* 1000
            })

        const accessToken = createAccessToken(accessData)


        successResponse.message = "Login Successfull"
        successResponse.data = { ...data, accessToken}

        return res.status(status.SUCCESS).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
}

const refreshAccessHandler = async (req, res) => {  // Just copied from login
    const {user_id, role, name} = req.user

    let refreshData = null
        let accessData = null
        let data = {}

        try {
            if(role === roles.ADMIN){
                // Will be thought
        
            } else if(role === roles.COLLEGE) {
                const {result, err, status: stat} = await findCollege(user_id)
                if(err)
                    return res.status(stat).json(err)
    
                refreshData = {sub: result.creator, college: result.colleg_id, tokenVersion: result.tokenVersion}
    
                accessData = {college_id: result.college_id, role, creator: result.creator} // access token 
    
                data = {...result, creator_name: name, role}
    
            } else if(role === roles.TEACHER) {
                const {result, err, status: stat} = await findTeacher(user_id)
                if(err)
                    return res.status(stat).json(err)
    
                refreshData = {sub: user_id, tokenVersion: result.tokenVersion}
    
                accessData = {college_id: result.college_id, role, userId: user_id}
    
                data = { ...result, name, role}
            } else if(role === roles.STUDENT) {
                const {result, err, status: stat} = await findStudent(user_id)
                if(err)
                    return res.status(stat).json(err)
    
                refreshData = {sub: user_id, tokenVersion: result.tokenVersion}
    
                accessData = {college_id: result.college_id, role, userId: user_id}
    
                data = { ...result, name, role}
            }
    
            const refreshToken = createRefreshToken(refreshData)
            res.cookie("refreshToken",refreshToken,{
                    httpOnly: true,
                    sameSite: "lax",
                    secure: "production" === process.env.NODE_MODULES,
                    maxAge: 7* 24* 60* 60* 1000
                })
    
            const accessToken = createAccessToken(accessData)
    
    
            successResponse.message = "New Refresh Token created Successfull"
            successResponse.data = { ...data, accessToken}
    
            return res.status(status.SUCCESS).json(successResponse)
        } catch (error) {
            errorResponse.error = error
        return res.status(status.SERVER_ERROR).json(errorResponse)
        }
}

const logout = (req, res) => {
  res.clearCookie("refreshToken", { path: "/" });

  successResponse.message = "Logged Out Successfully"
  return res.status(200).json(successResponse);
}

const emailVerificationRoles = async (req, res) => {
    const userData = req.userData
    try {
        const emailVerified = true
        const {result: emailDone, err} = createPassword({password: userData.password, isEmailVerified: emailVerified, date_of_birth: userData.dob})
        if(err) {
            errorResponse.error = err
            return res.status(status.SERVER_ERROR).json(errorResponse)
        }
        if(!emailDone) {
            errorResponse.message = "Email Verification Unsuccessfull"
            return res.status(status.SERVER_ERROR).json(errorResponse)
        }

        successResponse.message = "Email Verification Successfull"
        successResponse.data = {
            isEmailVerified: emailDone,
            dataOfBirth: userData.dob
        }
    } catch (error) {
        errorResponse.error = error
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
}

module.exports = {
    login,
    // refresh access token
    emailVerificationRoles,
     logout
}
