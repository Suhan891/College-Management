const Joi = require("joi");

const registerDepartment = Joi.object({
    departmentName: Joi.string().required(),
    departmentCode: Joi.string().required(),
    streamId: Joi.string().uuid().required(), 
    hod: Joi.string().uuid().required()
})

module.exports = {
    registerDepartment
}