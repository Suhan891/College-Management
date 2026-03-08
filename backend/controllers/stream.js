const streamService = require('../service/stream')
const { status } = require('../utils/constants')
const { errorResponse, successResponse } = require('../utils/response')

const createStream = async (req, res) => {
    const streamData = req.streamData

    try {
        const {err, result} = await streamService.createStream({
            course_id: streamData.courseId,
             stream_name: streamData.streamName,
              stream_code: streamData.streamCode
            })
        if(err){
            errorResponse.error = err
            return res.status(status.SERVER_ERROR).json(errorResponse)
        }
        console.log(result)

        const streamId = result.stream_id
        
        successResponse.message = "New Stream Created"
        successResponse.data = { streamId, ...streamData}

        return res.status(status.SUCCESS).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
}

module.exports = {
    createStream
}