const express = require('express')
const router = express.Router()
// const AuthCtrl = require('../controllers/auth.conroller')
const { AuthController, CartsController } = require('../controllers')

//get all products attached to this user's cart
router.get('/find/:userid', CartsController.searchByUser)

//make a new cart for a user
router.post('/new/:userid', CartsController.createCart)

//add a product to a user's cart
router.post('/change', AuthController.verifyUser, CartsController.addOrRemove)


//remove a product from a user's cart
// router.delete('/remove/:userid', CartsController.removeFromCart)


module.exports = router
