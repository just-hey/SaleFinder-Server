const express = require('express')
const router = express.Router()
// const AuthCtrl = require('../controllers/auth.conroller')
const { ProductsController } = require('../controllers')

//search for product by name (not from this db)
router.get('/foreign/:name', ProductsController.searchByName)

//add products to db via array from crawlers
router.post('/add', ProductsController.createProduct)

//remove products from db based off time? HOW?!



module.exports = router
