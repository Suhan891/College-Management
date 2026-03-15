const userService = require("../service/user");
const teacherService = require("../service/teacher")
const { roles, status } = require("../utils/constants");
const tokens = require("../lib/tokens")
const { mailtrapEmailSend } = require("../lib/email");
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
    const collegeId = req.collegeId
    console.log({collegeId, teacherId})
    try {
      const {result: user, err: findError} = await teacherService.findUser(teacherId)
      if(findError) {
        errorResponse.error = findError
        return res.status(status.SERVER_ERROR).json(errorResponse)
      }
      console.log(user)

      if(user.isEmailVerified) {
        errorResponse.message = "Email already verified. Please login"
        return res.status(status.BAD_REQUEST).json(errorResponse)
      }
      console.log(user)

      if(user.role !== roles.TEACHER) {
        errorResponse.message = "Invalid role credentials"
        return res.status(status.BAD_REQUEST).json(errorResponse)
      }

      // const {result: college, err: collegeError} = await teacherService.getCollege(collegeId)
      // if(collegeError) {
      //   errorResponse.error = err
      //   return res.status(status.SERVER_ERROR).json(errorResponse)
      // }
      // console.log(college)
      const payload = {
        sub: user.user_id,
        role: user.role
      }
      console.log(payload)
      const studentToken = tokens.createRolesToken(payload)
      console.log(studentToken)
      const url = `${process.env.CLIENT_URL ||"http://localhost:3000"}/auth/verify-role?token=${studentToken}&email=${user.email}`

      //const subject = `College Logo:${college.college_logo}. We ${college.college_name} invite you to verify your Email`
      const subject = "Verify your email"
      const html = `<p>Hello ${user.name} please click the below link: <br/> ${url}</p>`
      console.log(html);
      
     // const response = await mailtrapEmailSend({to: user.email, subject,html})
      const response = await mailtrapEmailSend({to: user.email,subject,html})
        if(!response){
            errorResponse.message= "Mail sending Unsuccessfull"
            return res.status(500).json(errorResponse)
        }

        successResponse.message = "Please verify your email"
      return res.status(status.SUCCESS).json(successResponse)
    } catch (error) {
      errorResponse.error = error
      return res.status(status.SERVER_ERROR).json(errorResponse)
    }
}

module.exports = {
    createTeacher,
    teacherRegisters
}