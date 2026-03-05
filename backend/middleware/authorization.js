const { checkCollegHead } = require("../service/authorization");

const validateRole = () => {
    // Check of role

    req.userId = result.id
}

const validateCollegeHead = (req, res, next) => {
    const {userId} = req.user

    const {result, err, status: stat} = checkCollegHead(refreshData.sub);
    if(err)
        return res.status(stat).json(err)

    req.collegeId = result.college_id
    next()
}

module.exports = {
    validateCollegeHead
}