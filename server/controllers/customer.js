const { Customer } = require('../models')
const { comparePwd } = require('../helpers/bcrypt')
const { encode } = require('../helpers/jwt')

class CustomerController{
    static async register(req, res, next){
        try {
            const { username, email, password, phone, address } = req.body
            const newCustomer = await Customer.create({ username, email, password, phone, address })

            res.status(201).json({id: newCustomer.id, username: newCustomer.username, email: newCustomer.email})
        } catch (error) {
            next(error)
        }
    }
    static async login(req, res, next){
        try {
            const error = {
                name: "InputRequired",
                errors: []
            }

            const invalidLogin = {
                name: "InvalidInputLogin",
                errors: [{message: "Invalid email or password"}]
            }

            const { email, password } = req.body
            if(!email){
                error.errors.push({message: "Email is required"});
                throw error
            }
            if(!password){
                error.errors.push({message: "Password is required"});
                throw error
            }

            const customer = await Customer.findOne({where: {email}})
            if(!customer) throw invalidLogin

            const validPwd = comparePwd(password, customer.password)
            if(!validPwd) throw invalidLogin
            
            res.status(200).json({
                access_token: encode({id: customer.id}),
                username: customer.username,
                email: customer.email
            })
        } catch (error) {
            next(error)
        }
    }

    static async getCustomers(req, res, next){
        try {
            const customers = await Customer.findAll({
                attributes: {exclude: ['password']},
                order: [['updatedAt', 'DESC']]
            })

            res.status(200).json(customers)
        } catch (error) {
            next(error)
        }
    }

    static async getCustomer(req, res, next){
        try {
            const customer = await Customer.findByPk(req.params.id, {
                attributes: {exclude: ['password']}
            })
            if(!customer) throw { name: "DataNotFound" }

            res.status(200).json(customer)
        } catch (error) {
            next(error)
        }
    }

    static async updateBanStatus(req, res, next){
        try {
            const customer = await Customer.findByPk(req.params.id, {
                attributes: {exclude: ['password']}
            })
            if(!customer) throw { name: "DataNotFound" }

            await Customer.update({banned: !customer.banned}, {where: {id: req.params.id}})

            res.status(200).json({message: `Ban status of customer with id ${customer.id} has updated`})
        } catch (error) {
            next(error)
        }
    }

    static async updateProfile(req, res, next){
        try {
            const customer = await Customer.findByPk(req.params.id, {
                attributes: {exclude: ['password']}
            })
            if(!customer) throw { name: "DataNotFound" }

            const { username, phone, address } = req.body
            await Customer.update({username, phone, address}, {where: {id: req.params.id}})

            res.status(200).json({message: "Profile updated"})
        } catch (error) {
            next(error)
        }
    }

    static async deleteCustomer(req, res, next){
        try {
            const customer = await Customer.findByPk(req.params.id, {
                attributes: {exclude: ['password']}
            })
            if(!customer) throw { name: "DataNotFound" }

            await Customer.destroy({where: {id: req.params.id}})

            res.status(200).json({message: `Customer with id ${req.params.id} successfully deleted`})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CustomerController