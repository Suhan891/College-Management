const Joi = require("joi");

const registerCourse = Joi.object({
    course_name: Joi.string().required(),
    course_code: Joi.string().required(),
    duration_years: Joi.number().integer().positive().required(), 
    total_semesters: Joi.number().integer().positive().required()
})

module.exports = {
    registerCourse
}