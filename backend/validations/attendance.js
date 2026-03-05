const Joi = require("joi");


const registerAttendanceSession = Joi.object({
    timetableId: Joi.string().uuid().required(),
    sessionDate: Joi.string().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
})
const registerAttendance = Joi.object({
    studentId: Joi.string().uuid().required(),
    timeTableId: Joi.string().uuid().required(),
    status: Joi.string().valid('PRESENT', 'ABSENT'),
    sourceRole: Joi.string().valid('STUDENT','TEACHER','CLASS_TEACHER')
})

module.exports = {
    registerAttendanceSession,
    registerAttendance
}