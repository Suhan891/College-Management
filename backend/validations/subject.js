const Joi = require("joi");

// Making subject table
const registerSubject = Joi.object({
    subjectName: Joi.string().required(),
    departmentId: Joi.string().uuid().required()
})



// Making class_subject table
const registerSubjectClass = Joi.object({
    classId: Joi.string().uuid().required(),
    subjectId: Joi.string().uuid().required(),
    teacherId: Joi.string().uuid().required() 
})

module.exports = {
    registerSubject,
    registerSubjectClass
}