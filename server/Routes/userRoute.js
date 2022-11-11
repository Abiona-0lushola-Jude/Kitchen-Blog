const express = require('express')
const router = express.Router()
const userController = require('../Controller/userController')


// login user
router.post('/login', userController.loginUser )


// regsiter users
router.post('/register', userController.regsiterUser)


// signout
router.post('/signout/:id', userController.signout)


module.exports = router