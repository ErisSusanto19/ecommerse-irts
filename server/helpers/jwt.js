const jwt = require('jsonwebtoken')

const JWT_SIGN = process.env.JWT_SIGN

const encode = (payload) => {
    return jwt.sign(payload, JWT_SIGN)
}

const decode = (token) => {
    return jwt.verify(token, JWT_SIGN)
}

module.exports = {encode, decode}