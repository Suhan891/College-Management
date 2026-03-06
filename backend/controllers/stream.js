const streamService = require('../service/stream')
const { status } = require('../utils/constants')
const { errorResponse } = require('../utils/response')

const createStream = async (req, res) => {
    const streamData = req.streamData

    try {
        const {error, result} = await streamService.createStream({
            course_id: streamData.courseId,
             stream_name: streamData.streamName,
              stream_code: streamData.streamCode,
               hod: streamData.hod
            })
        if(error){
            errorResponse.error = error
            return res.status(status.SERVER_ERROR).json(errorResponse)
        }

        const streamId = result.stream_id
        
        successResponse.message = "New Stream Created"
        successResponse.data = { streamId, ...result}

        return res.status(status.SUCCESS).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
}

module.exports = {
    createStream
}