const express = require('express')
const router = express.Router()
const AuthCtrl = require('../controllers/auth.conroller')
const UsersCtrl = require('../controllers/users.conroller')

router.post('/signup', UsersCtrl.create)

router.post('/login', UsersCtrl.login)

module.exports = router
