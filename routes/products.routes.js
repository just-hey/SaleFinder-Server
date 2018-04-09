const express = require('express')
const router = express.Router()
const { ProductsController } = require('../controllers')


//search for product by name (not from this db)
router.get('/foreign/:name', ProductsController.searchByNameForeign)

//search for product by name (LOCALLY)
router.get('/local/:name', ProductsController.searchByNameLocal)

//add products to db via array from crawlers
router.post('/add', ProductsController.createProduct)

//get all products
router.post('/all', ProductsController.getAllProducts)

//remove products from db based off time? HOW?!


module.exports = router
