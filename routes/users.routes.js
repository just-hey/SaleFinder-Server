const express = require('express')
const router = express.Router()
const { AuthController, UsersController } = require('../controllers')

router.get('/viewAll', UsersController.viewAll)
router.post('/signup', UsersController.create)
router.post('/login', UsersController.login)

// Change user profile
// router.put('/:id', AuthController.isOwnerOfUser, UsersCtrl.update)
// Delete User
// router.delete('/:id', AuthController.isOwnerOfUserOrAdmin, UsersCtrl.destroy)

module.exports = router
