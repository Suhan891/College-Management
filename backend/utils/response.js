const successResponse = {
    success:'true',
    data: {},
    message: "Successfull",
    error: {}
}

const errorResponse = {
    success: 'false',
    data: {},
    message: "Something went wrong",
    error: {}
}

module.exports = {
    successResponse,
    errorResponse
}