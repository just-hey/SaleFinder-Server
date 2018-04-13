const express = require('express')
const router = express.Router()
const { AuthController, UsersController } = require('../controllers')

//temp view all users route
router.get('/viewAll', UsersController.viewAll)

router.post('/signup', UsersController.create)
router.post('/login', UsersController.login)
router.get('/byToken', UsersController.byToken)
router.put('/:id', AuthController.isCurrent, UsersController.update)


module.exports = router
