const roles = {
    ADMIN: 'admin',
    COLLEGE: 'college',
    TEACHER: 'teacher',
    STUDENT: 'student'
}

const status = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    SUCCESS: 200,
    OK: 201
}

const days = {
    MONDAY: 'Monday',
    TUESDAY: 'Tuesday',
    WEDNESDAY: 'Wednesday',
    THURSDAY: 'Thursday',
    FRIDAY: 'Friday',
    SATURDAY: 'Saturday',
    SUNDAY: 'Sunday'
}

const dayStatus = {
    WORKING: 'WORKING',
    HOLIDAY: 'HOLIDAY'
}

module.exports = {
    roles,
    status,
    days,
    dayStatus
}
