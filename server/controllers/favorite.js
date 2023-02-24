const { Favorite, Product } = require('../models')
const { Op } = require('sequelize')

class FavoriteController{
    static async getFavorites(req, res, next){
        try {
            const favorites = await Favorite.findAll({
                where: {CustomerId: req.customer.id},
                include: { model: Product }
            })

            res.status(200).json(favorites)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async createFavorite(req, res, next){
        try {
            const { productId } = req.params
            const product = await Product.findByPk(productId)
            if(!product) throw {name: 'DataNotFound'}

            const favorite = await Favorite.findAll({
                where: {
                    [Op.and]: [{ CustomerId: req.customer.id }, { ProductId: productId }]
                }
            })
            
            if(favorite.length != 0) throw {name: "DuplicateFavorite"}

            const newFavorite = await Favorite.create({CustomerId: req.customer.id, ProductId: productId})

            res.status(201).json({id: newFavorite.id, CustomerId: newFavorite.CustomerId, ProductId: newFavorite.NewsId})
        } catch (error) {
            next(error)
        }
    }

    static async deleteFavorite(req, res, next){
        try {
            const favorite = await Favorite.findByPk(req.params.id)
            if(!favorite) throw { name: "DataNotFound" }
            
            await Favorite.destroy({where: {id: req.params.id}})

            res.status(200).json({message: `Favorite product successfully deleted`})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = FavoriteController