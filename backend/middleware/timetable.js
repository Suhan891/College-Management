const validationTimetable = require('../validations/timetable')
const serviceTimeTable = require('../service/timetable')
const { errorResponse } = require('../utils/response')
const { status } = require('../utils/constants')

const createTimeSlots = (req, res, next) => { // Later -> Also check from calender if today is a working day -> Will be done in controller

    const {error, value} = validationTimetable.registerTimeSlot(req.body)
    if(error) {
        errorResponse.message = error.message[0]
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {err: timSlotErr, result: isTimeSlot} = serviceTimeTable.existingTimeSlots({period_number, start_time, end_time})
    if(timSlotErr) {
        errorResponse.error = timSlotErr
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    if(isTimeSlot) {
        errorResponse.message = "Time Slot already created"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    req.timeSlotData = value
    next()
}

const createTimeTableVersioning  = (req, res, next) => {
    const collegeId = req.collegeId
    const {error, value} = validationTimetable.registeringTimetbleVersioning(req.body)
    if(error) {
        errorResponse.message = error.message[0]
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }
    
    const {err: timVersionErr, value: isTimVersion} = serviceTimeTable.existingTimeTableVersioning({stream_id: value.streamId, effective_from: value.effectiveFrom, effective_to: value.effectiveTo})
    if(timVersionErr) {
        errorResponse.error = timVersionErr
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    if(isTimVersion) {
        errorResponse.message = "Time Version already exists"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {err: streamErr, result: stream} = serviceTimeTable.getCollegeFromStream({stream_id: value.streamId})
    if(streamErr) {
        errorResponse.error = streamErr
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }

    if(stream.college_id !== collegeId) {
        errorResponse.message = "Stream not from same college"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    req.timetableversionData = value
    next()
}

const createTimetable = (req, res, next) => {
    const collegeId = req.collegeId
    const {error, value} = validationTimetable.registerTimetable(req.body)
    if(error) {
        errorResponse.message = error.message[0]
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {err: timetableErr, result: isTimeTable} = serviceTimeTable.existingTimeSlots({time_slot_id: value.timeSlotId, class_subject_id: value.classSubjectId, day: value.day})
    if(timetableErr) {
        errorResponse.error = timetableErr
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    if(isTimeTable) {
        errorResponse.message = "Time Table already created"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result: timVers, err: timVersError} = serviceTimeTable.getStreamFromTimetableVersion({version_id: value.versionId})
    if(timVersError) {
        errorResponse.error = timVersError
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
    const {result: classSubject, err: classSubjectError} = serviceTimeTable.getStreamFromClassSubject({class_subject_id: value.classSubjectId})
    if(classSubjectError) {
        errorResponse.error = classSubjectError
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }

    if(timVers.stream_id !== classSubject.stream_id) {
        errorResponse.message = "Stream not matching"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    const {result: college, err: collegeError} = serviceTimeTable.getCollegeFromtimeSlot({time_slot_id: value.timeSlotId})
    if(collegeError) {
        errorResponse.error = collegeError
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }

    if(college.college_id !== collegeId) {
        errorResponse.message = "College not matching"
        return res.status(status.BAD_REQUEST).json(errorResponse)
    }

    req.timeTableData = value

    next()
}

module.exports = {
    createTimeSlots,
    createTimeTableVersioning,
    createTimetable
}