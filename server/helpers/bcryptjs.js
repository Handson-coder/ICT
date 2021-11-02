const  bcryptjs = require('bcryptjs')

function hashPassword(value) {
    return bcryptjs.hashSync(value, bcryptjs.genSaltSync(10))
}

function checkPassword(value, hash) {
    return bcryptjs.compareSync(value, hash)
}

module.exports = { hashPassword, checkPassword }