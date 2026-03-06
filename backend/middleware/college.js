const { status } = require('../utils/constants')
const { errorResponse } = require('../utils/response')
const validationCollege = require('../validations/college')
const serviceCollege = require('../service/college')
const tokens = require('../lib/tokens')

const validateCollegeCreation = (req, res, next) => {
    const {user, college} = req.body

    const {error: creatorError, value: creatorValue} = validationCollege.registerCollegeCreator(user)
    if(creatorError) {
        errorResponse.message = creatorError.message[0]
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result: isExistingUser, err: isExistingErr} = serviceCollege.existingUser(creatorValue.email)
    if(isExistingErr) {
        errorResponse.message = "Database error while checking existing user"
        return res.status(status.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
    if(isExistingUser) {
        errorResponse.message = "User already exists with this email"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {error: collegeError, value: collegeValue} = validationCollege.registerCollege(college)
    if(collegeError) {
        errorResponse.message = collegeError.message[0]
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    req.user = creatorValue
    req.college = collegeValue
    next()
}

const validateCollegeEmailConfirmation = (req, res, next) => {
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
    const {user} = req.body
    const {value: userValue, error: userError} = validationCollege.confirmEmail(user)  // having dob within user
    if(userError) {
        errorResponse.message = userError.message[0]
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result, err} = serviceCollege.isUser({user_id: decoded.sub})
    if(err) {
        errorResponse.message = "Database error while verifying user"
        return res.status(status.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
    if(!result || result.length === 0) {
        errorResponse.message = "User not found"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result: creator, err: creatorCollegeErr} = serviceCollege.creatorFromCollege({college_id: decoded.collegeId})
    if(creatorCollegeErr) {
        errorResponse.error = creatorCollegeErr;
        return res.status(status.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
    if(!creator || creator.length === 0) {
        errorResponse.message = "Creator not found for this college"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    if(creator.creator !== decoded.sub) {
        errorResponse.message = "User is not the creator of this college"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    req.userValue = userValue
    next()
}

const validateCollegeAdress = (req, res, next) => {
    const adress = req.body
    const collegeId = req.collegeId
    const {error, value} = validationCollege.registerAdress(adress)
    if(error) {
        errorResponse.message = error.message[0]
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result: isExistingAdress, err: isExistingAddressErr} = serviceCollege.existingAdress({college_id: collegeId, latitude: value.latitude, longitude: value.longitude})
    if(isExistingAddressErr) {
        errorResponse.message = "Database error while checking existing address"
        return res.status(status.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
    if(isExistingAdress) {
        errorResponse.message = "Address already exists for this location in the college"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    req.addressValue = value
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

    const {result: isExistingSpecialDate, err: isExistingSpecialDateErr} = serviceCollege.existingSpecialDate({college_id: req.collegeId, specific_date: value.specificDate})
    if(isExistingSpecialDateErr) {
        errorResponse.error = isExistingSpecialDateErr
        return res.status(status.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
    if(isExistingSpecialDate) {
        errorResponse.message = "Special date already exists for this college on the given date"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result: calenderResult, err: calenderErr} = serviceCollege.getCalenderByCollegeId({college_id: collegeId})
    if(calenderErr) {
        errorResponse.error = calenderErr
        return res.status(status.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
    if(!calenderResult || calenderResult.length === 0) {
        errorResponse.message = "Calendar not found for this college. Please create a calendar before adding special dates."
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }
    
    req.specialDateValue = value
    next()
}

module.exports = {
    validateCollegeCreation,
    validateCollegeEmailConfirmation,
    validateCollegeAdress,
    validateCollegeCalender,
    validateCollegeSpecialDate
}