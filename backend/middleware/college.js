const { status, roles } = require('../utils/constants')
const { errorResponse } = require('../utils/response')
const validationCollege = require('../validations/college.js')
const serviceCollege = require('../service/college')
const tokens = require('../lib/tokens')

const validateCollegeCreation = async (req, res, next) => {
    if (!req.body || !req.body.user || !req.body.college) {
        errorResponse.message = "All the fields are not yet received"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }
    const {user, college} = req.body

    const {error: creatorError, value: creatorValue} = validationCollege.registerCollegeCreator.validate(user)
    if(creatorError) {
        errorResponse.message = creatorError.details[0].message.replace(/"/g, "")
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result: isExistingUser, err: isExistingErr} = await serviceCollege.existingUser({email :creatorValue.email})
    if(isExistingErr) {
        errorResponse.error = isExistingErr
        return res.status(status.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
    console.log("Existing User: ",isExistingErr)
    if(isExistingUser.exists) {
        errorResponse.message = "User already exists with this email"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {error: collegeError, value: collegeValue} = validationCollege.registerCollege.validate(college)
    if(collegeError) {
        errorResponse.message = collegeError.details[0].message.replace(/"/g, "")
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    console.log(creatorValue)
    req.user = creatorValue
    req.college = collegeValue
    next()
}

const validateCollegeEmailConfirmation = async (req, res, next) => {
    const {token} = req.query
    if(!token) {
        errorResponse.message = "Token is required for email confirmation"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const decoded = tokens.verifyCollegeRegistrationToken(token)
    if(!decoded) {
        errorResponse.message = "Invalid or expired token"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }
    if (!req.body || !req.body.user) {
        errorResponse.message = "All the fields are not yet received"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }
    const {user} = req.body
    const {value: userValue, error: userError} = validationCollege.confirmEmail.validate(user)  // having dob within user
    if(userError) {
        errorResponse.message = userError.details[0].message.replace(/"/g, "")
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result, err} = await serviceCollege.isUser({user_id: decoded.sub})
    if(err) {
        errorResponse.error = err
        console.log(err)
        return res.status(status.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
    if(!result || result.length === 0) {
        errorResponse.message = "User not found"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }
    if(result.role !== roles.COLLEGE) {
        errorResponse.message = "Only college Admin can verify"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }
    if(result.is_Email_verified === true) {
        errorResponse.message = "Your Email is already verified"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result: creator, err: creatorCollegeErr} = await serviceCollege.creatorFromCollege({college_id: decoded.collegeId})
    console.log(creator)
    if(creatorCollegeErr) {
        errorResponse.error = creatorCollegeErr;
        return res.status(status.INTERNAL_SERVER_ERROR).json(errorResponse)
    }

    if(creator.creator !== decoded.sub) {
        errorResponse.message = "User is not the creator of this college"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    req.collegeId = decoded.collegeId
    req.userId = decoded.sub
    req.userData = userValue
    next()
}

const validateCollegeAdress = async (req, res, next) => {
    const adress = req.body.adress
    const collegeId = req.collegeId
    if (!req.body || !req.body.user) {
        errorResponse.message = "All the fields are not yet received"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }
    const {error, value} = validationCollege.registerAdress.validate(adress)
    if(error) {
        console.log(error)
        errorResponse.message = error.details[0].message.replace(/"/g, "")
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result: isExistingAdress, err: isExistingAddressErr} = await serviceCollege.existingAdress({ college_id: collegeId, latitude: value.latitude, longitude: value.longitude })
    if(isExistingAddressErr) {
        errorResponse.message = "Database error while checking existing address"
        return res.status(status.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
    console.log("Adress existing: ",isExistingAdress)
    if(isExistingAdress.exists) {
        errorResponse.message = "Address already exists for this location in the college"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    console.log('Adress middle ware done')
    req.addressData = value
    next()
}

const validateCollegeCalender = (req, res, next) => {
    const {error, value} = validationCollege.registerCalender(req.body)
    if(error) {
        errorResponse.message = error.message[0]
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result: isExistingCalender, err: isExistingCalenderErr} = serviceCollege.existingCalender({college_id: req.collegeId, academic_session: value.academicSession})
    if(isExistingCalenderErr) {
        errorResponse.error = isExistingCalenderErr
        return res.status(status.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
    if(isExistingCalender) {
        errorResponse.message = "Calendar already exists for this college"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }
    req.calenderValue = value
    next()
}

const validateCollegeSpecialDate = (req, res, next) => {
    const collegeId = req.collegeId
    const {error, value} = validationCollege.registerSpecialDate(req.body)
    if(error) {
        errorResponse.message = error.message[0]
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result: isExistingSpecialDate, err: isExistingSpecialDateErr} = serviceCollege.existingSpecialDate({calender_id: value.calenderId, specific_date: value.specificDate})
    if(isExistingSpecialDateErr) {
        errorResponse.error = isExistingSpecialDateErr
        return res.status(status.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
    if(isExistingSpecialDate) {
        errorResponse.message = "Special day already created on this date"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result: calenderResult, err: calenderErr} = serviceCollege.calenderExists({calender_id: value.calenderId, college_id: collegeId})
    if(calenderErr) {
        errorResponse.error = calenderErr
        return res.status(status.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
    if(!calenderResult) {  // As this query will return true or false
        errorResponse.message = "Calendar not found for this college. Please create a calendar before adding special dates."
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }
    
    req.specialDateData  = value
    next()
}

module.exports = {
    validateCollegeCreation,
    validateCollegeEmailConfirmation,
    validateCollegeAdress,
    validateCollegeCalender,
    validateCollegeSpecialDate
}