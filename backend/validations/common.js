const Joi = require('joi')
const { roles } = require('../utils/constants')

const validateLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})
const validateEmailVerifyRoles = Joi.object({
    password: Joi.string().required(),
    dob: Joi.string().required()  // By default it accepts: 2024-03-05  -> this is crucial unchangablr by user but only by admin or college
})

module.exports = {
    validateLogin,
    validateEmailVerifyRoles
}