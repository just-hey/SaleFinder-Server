const express = require('express')
const router = express.Router()
const { ProductsController } = require('../controllers')


//search for product by name (LOCALLY)
router.get('/local/:name', ProductsController.searchByNameLocal)

//search for array of products by their ids
router.post('/byIds', ProductsController.searchByIDLocal)

//add products to db via array from crawlers
router.post('/add', ProductsController.createProduct)

//get all products via zip
router.post('/all', ProductsController.getAllProducts)

//remove products from db based off time? HOW?!


module.exports = router
