const { decode } = require('../helpers/jwt')
const { Admin, Customer } = require('../models')

const authAdm = async (req, res, next) => {
    try {
        const {access_token} = req.headers
        if(!access_token) throw {name: "InvalidToken"}

        const payload = decode(access_token)
        if(payload.code !== 1 ) throw { name: "Forbidden"}

        const admin = await Admin.findByPk(payload.id)
        if(!admin) throw {name: "InvalidToken"}

        req.admin = {
            id: admin.id,
            email: admin.email
        }

        next()
    } catch (err) {
        next(err)
    }
}

const authCust = async (req, res, next) => {
    try {
        const {access_token} = req.headers
        if(!access_token) throw {name: "InvalidToken"}

        const payload = decode(access_token)
        if(typeof payload.code !== 'undefined' ){
            throw { name: "Forbidden"}
        }

        const customer = await Customer.findByPk(payload.id)
        if(!customer) throw {name: "InvalidToken"}

        req.customer = {
            id: customer.id,
            email: customer.email
        }

        next()
    } catch (err) {
        next(err)
    }
}

module.exports = { authAdm, authCust }