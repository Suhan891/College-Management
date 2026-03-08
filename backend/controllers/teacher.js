const userService = require("../service/user");
const teacherService = require("../service/teacher")
const { roles, status } = require("../utils/constants");
const { errorResponse, successResponse } = require("../utils/response");

const createTeacher = async (req, res) => {
    const collegeId = req.collegeId

    const teacherData = req.teacherData
    console.log("In controller")
    try {
        const {result: user, err: err1} = await userService.createUser({
            name: teacherData.name,
            email: teacherData.email,
            role: roles.TEACHER
        })
        if(err1) {
            errorResponse.error = err1
            return res.status(status.SERVER_ERROR).json(errorResponse)
        }

        const {result: teacher, err: err2} = await teacherService.createTeacher({
            college_id: collegeId,
             registered_batch_number: teacherData.batchNumber,
              department_id: teacherData.departmentId,
               teacher_id: user.user_id
        })
        if(err2) {
            errorResponse.error = err2
            return res.status(status.SERVER_ERROR).json(errorResponse)
        }
        console.log("Last controller", teacher)

        const teacherId = teacher.teacher_id
        successResponse.message = "Teacher created successfully"
        successResponse.data = {teacherId, ...teacherData}
        return res.status(status.SUCCESS).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
}

const teacherRegisters = async (req, res) => {
    const teacherId = req.teacherId
    const collegId = req.collegId
    try {
      const {result: user, err: findError} = await teacherService.existingUser(teacherId)
      if(findError) {
        errorResponse.error = err
        return res.status(status.SERVER_ERROR).json(errorResponse)
      }

      if(user.isEmailVerified) {
        errorResponse.message = "Email already verified. Please login"
        return res.status(status.BAD_REQUEST).json(errorResponse)
      }

      if(user.role !== roles.TEACHER) {
        errorResponse.message = "Invalid role credentials"
        return res.status(status.BAD_REQUEST).json(errorResponse)
      }

      const {result: college, err: collegeError} = teacherService.getCollege(collegId)
      if(collegeError) {
        errorResponse.error = err
        return res.status(status.SERVER_ERROR).json(errorResponse)
      }

      const payload = {
        sub: user.user_id,
        role: user.role
      }
      const studentToken = tokens.createRolesToken(payload)
      const url = `${process.env.CLIENT_URL}?token=${studentToken}&email=${user.email}`

      const subject = `College Logo:${college.college_logo}. We ${college.college_name} invite you to verify your Email`
      const html = `<p>Hello ${user.name} please click the below link: <br/> ${url}</p>`

      const response = await mailtrapEmailSend({to: user.email, url,subject,html, purpose})
        if(!response){
            errorResponse.message= "Mail sending Unsuccessfull"
            return res.status(500).json(errorResponse)
        }
    } catch (error) {
      errorResponse.error = error
      return res.status(status.SERVER_ERROR).json(errorResponse)
    }
}

module.exports = {
    createTeacher,
    teacherRegisters
}