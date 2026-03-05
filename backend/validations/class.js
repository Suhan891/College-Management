const Joi = require("joi");

const versioningClass = Joi.object({
    effectiveFrom: Joi.date().required(),
    effectiveTo:Joi.date().required()
})

const registerClass = Joi.object({
    className: Joi.string().required(),
    academicYear: Joi.number().integer().required(),
    streamId: Joi.string().uuid().required(), 
    classTeacher: Joi.string().uuid().required()
})

module.exports = {
    versioningClass,
    registerClass
}
