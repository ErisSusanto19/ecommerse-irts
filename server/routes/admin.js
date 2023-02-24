const adminRouter = require('express').Router()
const AdminController = require('../controllers/admin')

adminRouter.post('/register', AdminController.register)
adminRouter.post('/login', AdminController.login)

module.exports = adminRouter