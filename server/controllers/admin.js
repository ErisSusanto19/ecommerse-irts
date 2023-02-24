const { Admin } = require('../models')
const { comparePwd } = require('../helpers/bcrypt')
const { encode } = require('../helpers/jwt')

class AdminController{
    static async register(req, res, next){
        try {
            const { email, password } = req.body
            const newAdmin = await Admin.create({ email, password })

            res.status(201).json({id: newAdmin.id, email: newAdmin.email})
        } catch (error) {
            // console.log(error);
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

            const admin = await Admin.findOne({where: {email}})
            if(!admin) throw invalidLogin

            const validPwd = comparePwd(password, admin.password)
            if(!validPwd) throw invalidLogin
            
            res.status(200).json({
                access_token: encode({id: admin.id, code: 1}),
                email: admin.email
            })
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }
}

module.exports = AdminController