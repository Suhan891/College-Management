const { registerCollegeQuery, getCollegeDetailsQuery, makeAddressQuery } = require("../query/college");
const { successResponse, errorResponse } = require("../utils/response");
const { collegeRegistration, verifyCollegeRegistrationToken } = require("../lib/tokens");
const { mailtrapEmailSend } = require("../lib/email");
const hashing = require("../lib/hashing");

const serviceCollege = require("../service/college");
const { roles, status } = require("../utils/constants");




const createCollege = async (req, res) => {
    const {user} = req.user
    const {college} = req.college
    //const {college_name, college_logo, established_year, email, password } = req.body;
        // Hnadle all try catch in service layer
        // const {result, error} = await registerCollegeQuery(college_name, college_logo, established_year, email, password);
        // if(error) {
        //     errorResponse.error = error;
        //     return res.status(500).json(errorResponse);
        // }
        const hashedPassword = hashing.createPassword(user.password)
        const {result: userResult, err: userErr} = await serviceCollege.createUser({name: user.name, email: user.email, password: hashedPassword, role: roles.COLLEGE})
        if(userErr) {
            errorResponse.error = userErr;
            return res.status(status.SERVER_ERROR).json(errorResponse);
        }

        const {result: collegeResult, err: collegeErr} = await serviceCollege.createCollege({college_id: userResult.college_id, college_name: college.collegeName, college_logo: college.collegeLogo, established_year: college.establishedYear, creator: userResult.user_id})
        if(collegeErr) {
            errorResponse.error = collegeErr;
            return res.status(status.SERVER_ERROR).json(errorResponse);
        }

        const token = collegeRegistration({collegeId: collegeResult.college_id, sub: userResult.user_id, role: roles.COLLEGE})

        const to = user.email
        const url = `${process.env.BASE_URL}/api/college/verify?token=${token}`;
        const subject = "EduTrack - Email Verification"
        const html = `<p>please verify your emal by clicking this link:</p>`        
        
        const response = await mailtrapEmailSend({to, url, subject, html})
        if(!response){
            errorResponse.message= "Mail sending Unsuccessfull"
            return res.status(500).json(errorResponse)
        }
        
        successResponse.data = result;
        successResponse.message = "Please verify your Email in Inbox";
        return res.status(201).json(successResponse);
}

const verifyEmail = async (req, res) => {  // On email verification
    const addressData = req.addressData
    const userValue = req.userValue
    const collegeId = req.collegeId

            // will be applied to frontend to get location
// function getOneTimeLocation() {
//     // 1. Check if the browser supports the Geolocation API
//     if (!navigator.geolocation) {
//         console.error("Geolocation is not supported by this browser.");
//         return;
//     }

//     // 2. Configure for maximum accuracy
//     const options = {
//         enableHighAccuracy: true, // Forces the use of GPS if available
//         timeout: 10000,           // Wait up to 10 seconds for a fix
//         maximumAge: 0             // Do not use a previously cached position
//     };

//     // 3. Request the position once
//     navigator.geolocation.getCurrentPosition(
//         (position) => {
//             const lat = position.coords.latitude;
//             const lng = position.coords.longitude;
//             console.log(`Exact Location: Lat ${lat}, Lng ${lng}`);
//             // Use your coordinates here (e.g., send to backend)
//         },
//         (error) => {
//             console.error(`Error code ${error.code}: ${error.message}`);
//         },
//         options
//     );
// }

// Also collegeRadius will be received
    try {
        const {result: adress, err: adressErr} =  serviceCollege.createAdress({
            college_id: collegeId,
             latitude: addressData.latitude,
              longitude: addressData.longitude,
               location: addressData.location,
                city: addressData.city,
                 state: addressData.state,
                  country: addressData.country,
                   pincode: addressData.collegeRadius
        })
        if(adressErr) {
            errorResponse.error = adressErr;
            return res.status(status.SERVER_ERROR).json(errorResponse);
        }
    
        const emailVerified = true
        const {result: user, err: userErr} = serviceCollege.updateUser({
            is_Email_verified: emailVerified,
             date_of_birth: userData.dob
        })
        if(userErr) {
            errorResponse.error = userErr;
            return res.status(status.SERVER_ERROR).json(errorResponse);
        }
    
        successResponse.data = {
            user: {
                userId: user.user_id,
                emailVerified,
                dob: userValue.dob
            },
            adress: {
                adressId: adress.adress_id,
                ...addressData
            }
        }
        successResponse.message = "Email Verification, with adress creation successfull"
        return res.status(status.OK).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
}

const createCalender = async (req, res) => {
    const calenderValue = req.addressData
    const collegeId = req.collegeId

    try {
        const {err, result} = await serviceCollege.createCalender({
            college_id: collegeId,
             academic_session: calenderValue.academicSession,
              start_date:calenderValue.academicSession,
               working_days: calenderValue.workingDays,
               end_date: calenderValue.endDate
            })
        if(err){
            errorResponse.error = err
            return res.status(status.SERVER_ERROR).json(errorResponse)
        }

        const calenderId = result.calender_id
        
        successResponse.message = "New Calender Created"
        successResponse.data = { calenderId, ...calenderValue}

        return res.status(status.SUCCESS).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
}

const createSpecialDate = async (req, res) => {
    const specialDateData = req.specialDateData

    try {
        const {err, result} = await serviceCollege.createCalender({
            day_exceptions_id: specialDateData.calenderId,
             specific_date: specialDateData.specificDate,
              day_status: specialDateData.dayStatus,
               reason: specialDateData.reason
            })
        if(err){
            errorResponse.error = err
            return res.status(status.SERVER_ERROR).json(errorResponse)
        }

        const dayExceptionId = result.day_exceptions_id
        
        successResponse.message = "Calender Exception day Created"
        successResponse.data = { dayExceptionId, ...specialDateData}

        return res.status(status.SUCCESS).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(status.SERVER_ERROR).json(errorResponse)
    }
}


module.exports = {
    createCollege,
    verifyEmail,
    createCalender,
    createSpecialDate
}