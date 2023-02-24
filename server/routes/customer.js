const customerRouter = require('express').Router()
const CustomerController = require('../controllers/customer')
const { authAdm, authCust } = require('../middlewares/authentication')

customerRouter.post('/register', CustomerController.register)
customerRouter.post('/login', CustomerController.login)

customerRouter.get('/', authAdm, CustomerController.getCustomers)
customerRouter.get('/:id', authAdm, CustomerController.getCustomer)
customerRouter.patch('/:id', authAdm, CustomerController.updateBanStatus)
customerRouter.put('/:id', authCust, CustomerController.updateProfile)
customerRouter.delete('/:id', authAdm, CustomerController.deleteCustomer)

module.exports = customerRouter