const Joi = require('joi')
const { roles } = require('../utils/constants')

const validateLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid(roles.ADMIN, roles.COLLEGE, roles.STUDENT, roles.TEACHER)
})
const validateEmailVerifyRoles = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    dob: Joi.date().required()  // By default it accepts: 2024-03-05  -> this is crucial unchangablr by user but only by admin or college
})

module.exports = {
    validateLogin,
    validateEmailVerifyRoles
}