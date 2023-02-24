const router = require('express').Router()
const adminRouter = require('./admin')
const customerRouter = require('./customer')
const productRouter = require('./product')
const favoriteRouter = require('./favorite')

router.use('/admins', adminRouter)
router.use('/customers', customerRouter)
router.use('/products', productRouter)
router.use('/favorites', favoriteRouter)

module.exports = router