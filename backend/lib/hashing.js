const bcrypt = require('bcrypt')

const createPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const checkLogin = (givenPassword, existingPassword) => {
    return bcrypt.compareSync(givenPassword, existingPassword)  // Return true or false
}

module.exports = {
    createPassword,
    checkLogin
}