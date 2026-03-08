const Joi = require("joi");

const registerStream = Joi.object({
    streamName: Joi.string().required(),
    streamCode: Joi.string().required(),
    courseId: Joi.string().uuid().required(), 
    // hod: Joi.string().uuid()
})

module.exports = {
    registerStream
}