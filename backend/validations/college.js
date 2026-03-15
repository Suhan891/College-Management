const Joi = require("joi");
const { days, roles } = require("../utils/constants");

// On College Registration
const registerCollegeCreator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required()
    //role: Joi.string().valid(roles.COLLEGE)
})
const registerCollege = Joi.object({
    collegeName: Joi.string().required(),
    establishedYear: Joi.number().integer().required(),
    collegeLogo: Joi.string() || "logo.png"
})

// On College email confirmation
const confirmEmail = Joi.object ({
    dob: Joi.string().required()
})
const registerAdress = Joi.object({
    latitude: Joi.number().required(), // Allowed float data type
    longitude: Joi.number().required(), // Allowed float data type
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    pincode: Joi.number().integer().required(),

    collegeRadius: Joi.number().integer().max(500) // based on college may provide
})

// All after login of College
const registerCalender = Joi.object({
    academicSession: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    workingDays: Joi.array().items(Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')).min(1).unique().required()
})
const registerSpecialDate = Joi.object({
    calenderId: Joi.string().uuid().required(),
    specificDate: Joi.string().required(),
    dayStatus: Joi.string().valid('WORKING', 'HOLIDAY'),
    reason: Joi.string(),
}) 

module.exports = {
    registerCollegeCreator,
    registerCollege,

    confirmEmail,
    registerAdress,

    registerCalender,
    registerSpecialDate
}