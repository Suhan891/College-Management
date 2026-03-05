const Joi = require("joi");

const validateStudentCreation = Joi.object({
    name: Joi.string().required(),
    email: Joi.email().required(),
    role: Joi.string().required(),
    enrollmentNumber: Joi.number().integer().positive().required(),
    registeredRoll: Joi.number().integer().positive().required(),
    session: Joi.string().required(),
    currentYear: Joi.number().integer().positive().max(10).required(),
    currentSemester: Joi.number().integer().positive().max(10).required(),
    classRoll: Joi.number().integer().positive().max(1000).required(),
    classId: Joi.string().uuid().required(),
    streamId: Joi.string().uuid().required()
})

const validateStudentRegistration = Joi.object({
    enrollmentNumber: Joi.number().integer().positive().required(),
    rollNumber: Joi.number().integer().positive().required()
})

module.exports = {
    validateStudentCreation,
    validateStudentRegistration,
    validateEmailVerification
}