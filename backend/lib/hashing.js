const bcrypt = require('bcrypt')

const checkLogin = (givenPassword, existingPassword) => {
    return bcrypt.compareSync(givenPassword, existingPassword)  // Return true or false
}

module.exports = {
    checkLogin
}