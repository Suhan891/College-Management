const timeTableService = require('../service/timetable')
const { status } = require('../utils/constants')
const { errorResponse } = require('../utils/response')

const createTimeSlot = async (req, res) => {
    const timeSlotData = req.timeSlotData

    try {
        const {err, result} = await timeTableService.createTimeSlots({
            calender_id: timeSlotData.collegeId,
             period_number: timeSlotData.periodNumber,
              start_time: timeSlotData.startTime,
               end_time: timeSlotData.endTime
            })
        if(err){
            errorResponse.error = err
            return res.status(status.SERVER_ERROR).json(errorResponse)
        }

        const timeSlotId = result.time_slot_id
        
        successResponse.message = "New Time SLot Created"
        successResponse.data = { timeSlotId, ...timeSlotData}

        return res.status(status.SUCCESS).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
}


const createTimeTableVersioning = async (req, res) => {
    const timetableVersionData = req.timetableVersionData

    try {
        const {err, result} = await timeTableService.createTimeTableVersioning({
            stream_id: timetableVersionData.streamId,
             effective_from: timetableVersionData.effectiveFrom,
              effective_to: timetableVersionData.effectiveTo
            })
        if(err){
            errorResponse.error = err
            return res.status(status.SERVER_ERROR).json(errorResponse)
        }

        const timetableVersionId = result.version_id
        
        successResponse.message = "New Time table Version Created"
        successResponse.data = { timetableVersionId, ...timetableVersionData}

        return res.status(status.SUCCESS).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
}

const createTimeTable = async (req, res) => {
    const timeTableData = req.timeTableData

    try {
        const {err, result} = await timeTableService.createTimeTable({ 
            version_id: timeTableData.versionId,
             class_subject_id: timeTableData.classSubjectId,
              time_slot_id: timeTableData.timeSlotId,
               day: timeTableData.day
            })
        if(err){
            errorResponse.error = err
            return res.status(status.SERVER_ERROR).json(errorResponse)
        }

        const timetableId = result.timetable_id
        
        successResponse.message = "New Time table Created"
        successResponse.data = { timetableId, ...timeTableData}

        return res.status(status.SUCCESS).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
}

module.exports = {
    createTimeSlot,
    createTimeTableVersioning,
    createTimeTable
}