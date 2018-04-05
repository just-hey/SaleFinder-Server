const express = require('express')
const router = express.Router()
// const AuthCtrl = require('../controllers/auth.conroller')
const { CartsController } = require('../controllers')

router.get('/:userid', CartsController.searchByUser)


module.exports = router
