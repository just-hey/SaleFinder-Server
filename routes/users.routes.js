const express = require('express')
const router = express.Router()
// const AuthCtrl = require('../controllers/auth.conroller')
const { UsersController } = require('../controllers')

router.post('/signup', UsersController.create)

// router.post('/login', UsersController.login)

module.exports = router
