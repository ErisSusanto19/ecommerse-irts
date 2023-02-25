const { Product } = require('../models')
const { Op } = require('sequelize')

class ProductController{
    static async getProducts(req, res, next){
        try {
            const format = {
                order: [['id', 'DESC']]
            }

            const { name } = req.query

            if(name){
                format.where = {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                }
            }

            const products = await Product.findAll(format)

            res.status(200).json(products)
        } catch (error) {
            next(error)
        }
    }

    static async getProduct(req, res, next){
        try {
            const product = await Product.findByPk(req.params.id)
            if(!product) throw { name: "DataNotFound" }

            res.status(200).json(product)
        } catch (error) {
            next(error)
        }
    }

    static async createProduct(req, res, next){
        try {
            const { code, name, price, brand, image, info } = req.body
            const newProduct = await Product.create({ code, name, price, brand, image, info })

            res.status(201).json(newProduct)
        } catch (error) {
            next(error)
        }
    }

    static async updateProduct(req, res, next){
        try {
            const { code, name, price, brand, image, info } = req.body

            const product = await Product.findByPk(req.params.id)
            if(!product) throw { name: "DataNotFound" }

            await Product.update({ code, name, price, brand, image, info }, {where: {id: req.params.id}})

            res.status(200).json({message: "Product updated"})
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct(req, res, next){
        try {
            const product = await Product.findByPk(req.params.id)
            if(!product) throw { name: "DataNotFound" }

            await Product.destroy({where: {id: req.params.id}})

            res.status(200).json({message: "Product deleted"})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController