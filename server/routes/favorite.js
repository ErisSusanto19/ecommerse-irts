const favoriteRouter = require('express').Router()
const FavoriteController = require('../controllers/favorite')
const { authCust } = require('../middlewares/authentication')

favoriteRouter.get('/', authCust, FavoriteController.getFavorites)
favoriteRouter.post('/:productId', authCust, FavoriteController.createFavorite)
favoriteRouter.delete('/:id', authCust, FavoriteController.deleteFavorite)

module.exports = favoriteRouter