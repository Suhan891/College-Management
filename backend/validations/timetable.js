const Joi = require("joi");
const { days } = require("../utils/constants");


const registerTimeSlot = Joi.object({
    periodNumber: Joi.number().integer().positive().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
    calenderId: Joi.string().uuid().required(),
})
const registeringTimetbleVersioning = Joi.object({
    streamId: Joi.string().uuid().required(),
    effectiveFrom: Joi.string().required(),
    effectiveTo: Joi.string().required(),
    
    adressId: Joi.string().uuid().required()  // Based on the college will confirm the adress for this timetable
})
const registerTimetable = Joi.object({
    versionId: Joi.string().uuid().required(),
    // calenderId: Joi.string().uuid().required(),
    classSubjectId: Joi.string().uuid().required(),
    timeSlotId: Joi.string().uuid().required(),
    day: Joi.string().valid(...Object.values(days))
})

module.exports = {
    registerTimeSlot,
    registeringTimetbleVersioning,
    registerTimetable
}