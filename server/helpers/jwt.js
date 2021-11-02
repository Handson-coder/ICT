const jwt = require('jsonwebtoken')

function signToken(payload) {
    return jwt.sign(payload, process.env.JWT_PASS)
}

function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_PASS)
}

module.exports = { signToken, verifyToken }