const bcrypt = require('bcrypt')

const createPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log(hash);
    
    return hash;
}

const checkLogin = (givenPassword, existingPassword) => {
    return bcrypt.compareSync(givenPassword, existingPassword)  // Return true or false
}

module.exports = {
    createPassword,
    checkLogin
}