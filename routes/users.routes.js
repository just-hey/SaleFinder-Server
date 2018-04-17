const express = require('express')
const router = express.Router()
const { AuthController, UsersController } = require('../controllers')

//temp view all users route
router.get('/viewAll', UsersController.viewAll)

router.get('/zip', UsersController.fetchZip)
router.delete('/zip/:id', UsersController.deleteZip)

router.post('/signup', UsersController.create)
router.post('/login', UsersController.login)
router.get('/byToken', UsersController.byToken)
router.patch('/:id', AuthController.verifyUser, UsersController.update)
router.delete('/:id', AuthController.verifyUser, UsersController.remove)


module.exports = router
