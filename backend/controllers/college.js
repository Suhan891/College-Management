const { registerCollegeQuery, getCollegeDetailsQuery, makeAddressQuery } = require("../query/college");
const { successResponse, errorResponse } = require("../utils/response");
const { collegeRegistration, verifyCollegeRegistrationToken } = require("../lib/tokens");
const { mailtrapEmailSend } = require("../lib/email");




const createCollege = async (req, res) => {
    const {college_name, college_logo, established_year, email, password } = req.body;
        // Hnadle all try catch in service layer
        const {result, error} = await registerCollegeQuery(college_name, college_logo, established_year, email, password);
        if(error) {
            errorResponse.error = error;
            return res.status(500).json(errorResponse);
        }

        const token = collegeRegistration(result.college_id, result.email, 'college');
        const url = `${process.env.BASE_URL}/api/college/verify?token=${token}`;

        
        
        const response = await mailtrapEmailSend(email, url, 'register')
        if(!response){
            errorResponse.message= "Mail sending Unsuccessfull"
            return res.status(500).json(errorResponse)
        }
        

        successResponse.data = result;
        successResponse.message = "Please verify your Email";
        return res.status(201).json(successResponse);
}

const verifyEmail = async (req, res) => {  // On email verification
    const { token } = req.query;
    if(!token) {
        errorResponse.message = "Token is required";
        return res.status(400).json(errorResponse);
    }
    try {
        const decoded = verifyCollegeRegistrationToken(token);
        if(!decoded) {
            errorResponse.message = "Invalid token";
            return res.status(400).json(errorResponse);
        }
        const collegeId = decoded.collegeId;
        const role = decoded.role;
        if(role !== 'college') {
            errorResponse.message = "Invalid token";
            return res.status(400).json(errorResponse);
        }

        const {result, error} = await getCollegeDetailsQuery(collegeId);
        if(error) {
            errorResponse.error = error;
            return res.status(500).json(errorResponse);
        }
        if(!result){
            errorResponse.message = "No such college available"
            return res.status(400).json(errorResponse)
        }

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

        const {latitude, longitude ,location, city, state, country, pincode} = req.body; // it will take address details from the request body and update the address table with the college id and address details, it will also update the location_id in the college table with the address id, this will be done in the service layer
        // latitude and longitude will be send by frontend
        const {result: res, error:err} = await makeAddressQuery({collegeId, latitude, longitude ,location, city, state, country, pincode})
        // get college details from database using collegeId
        // return college details
        if(err) {
            errorResponse.error = error;
            return res.status(500).json(errorResponse);
        }
    } catch (error) {
        
    }

}





module.exports = {
    createCollege
}