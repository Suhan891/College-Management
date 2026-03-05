const userService = require("../service/user");
const studentService = require("../service/student");
const { roles, status } = require("../utils/constants");
const { errorResponse } = require("../utils/response");
const tokens = require("../lib/tokens");
const { mailtrapEmailSend } = require("../lib/email");

const createStudent = async (req, res) => {
  const collegeId = req.collegeId;
  const studentData = req.studentData;
  try {
    const { result: user, err: err1 } = userService.createUser({
      name: studentData.name,
      email: studentData.email,
      role: roles.STUDENT,
    });
    if (err1) {
      errorResponse.error = err1;
      return res.status(status.SERVER_ERROR).json(errorResponse);
    }

    const { result: student, err: err2 } = studentService({
      college_id: collegeId,
      enrollment_number: studentData.enrollmentNumber,
      registered_roll_number: studentData.registeredRoll,
      session: studentData.session,
      current_year: studentData.currentYear,
      current_semester: studentData.currentSemester,
      current_roll: classRoll,
      class_id: classId,
      student_id: user.user_id,
    });
    if (err2) {
      errorResponse.error = err2;
      return res.status(status.SERVER_ERROR).json(errorResponse);
    }

    const studentId = student.student_id;
    successResponse.message = "Student created successfully";
    successResponse.data = { studentId, ...studentData };
    return res.status(status.SUCCESS).json(errorResponse);
  } catch (error) {
    errorResponse.error = error
    return res.status(status.SERVER_ERROR).json(errorResponse)
  }
};

// By student
const studentRegisters = async (req, res) => {
    const studentId = req.studentId
    const collegId = req.collegId
    try {
      const {result: user, err: findError} = await studentService.findUser(studentId)
      if(findError) {
        errorResponse.error = err
        return res.status(status.SERVER_ERROR).json(errorResponse)
      }

      if(user.isEmailVerified) {
        errorResponse.message = "Email already verified. Please login"
        return res.status(status.BAD_REQUEST).json(errorResponse)
      }

      if(user.role !== roles.STUDENT) {
        errorResponse.message = "Invalid role credentials"
        return res.status(status.BAD_REQUEST).json(errorResponse)
      }

      const {result: college, err: collegeError} = studentService.getCollege(collegId)
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
    createStudent,
    studentRegisters
}