const productRouter = require('express').Router()
const ProductController = require('../controllers/product')
const { authAdm } = require('../middlewares/authentication')

productRouter.get('/', authAdm, ProductController.getProducts)
productRouter.get('/:id', authAdm, ProductController.getProduct)
productRouter.post('/', authAdm, ProductController.createProduct)
productRouter.put('/:id', authAdm, ProductController.updateProduct)
productRouter.delete('/:id', authAdm, ProductController.deleteProduct)

module.exports = productRouter