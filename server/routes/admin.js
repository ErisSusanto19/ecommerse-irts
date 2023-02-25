const adminRouter = require('express').Router()
const AdminController = require('../controllers/admin')
const { authAdm } = require('../middlewares/authentication')

adminRouter.post('/login', AdminController.login)
adminRouter.post('/register', authAdm, AdminController.register)

module.exports = adminRouter