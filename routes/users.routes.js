const express = require('express')
const router = express.Router()
const { AuthController, UsersController } = require('../controllers')

//temp view all users route
router.get('/viewAll', UsersController.viewAll)

router.post('/signup', UsersController.create)
router.post('/login', UsersController.login)
router.get('/byToken', UsersController.byToken)

// Change user profile
// router.put('/:id', AuthController.isOwnerOfUser, UsersCtrl.update)
// Delete User
// router.delete('/:id', AuthController.isOwnerOfUserOrAdmin, UsersCtrl.destroy)

module.exports = router
