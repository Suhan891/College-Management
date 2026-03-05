
const Joi = require("joi");

const validateTeacherCreation = Joi.object({
    name: Joi.string().required(),
    email: Joi.email().required(),
    role: Joi.string().required(),
    batchNumber: Joi.number().integer().positive().required(),
    departmentId: Joi.string().uuid().required()
})

const validateTeacherRegistration = Joi.object({
    batchNumber: Joi.string().required()
})

module.exports = {
    validateTeacherCreation,
    validateTeacherRegistration
}