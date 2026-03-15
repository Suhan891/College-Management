
const Joi = require("joi");

const validateTeacherCreation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    batchNumber: Joi.number().integer().positive().required(),
    departmentId: Joi.string().uuid().required()
})

const validateTeacherRegistration = Joi.object({
    batchNumber: Joi.number().integer().required()
})

module.exports = {
    validateTeacherCreation,
    validateTeacherRegistration
}