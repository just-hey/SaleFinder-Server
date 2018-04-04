const express = require('express')
const router = express.Router()
// const AuthCtrl = require('../controllers/auth.conroller')
const { FoodsController } = require('../controllers')

router.get('/:name', FoodsController.searchByName)


module.exports = router
