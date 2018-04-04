const express = require('express')
const router = express.Router()
// const AuthCtrl = require('../controllers/auth.conroller')
const { ProductsController } = require('../controllers')

router.get('/:name', ProductsController.searchByName)


module.exports = router
