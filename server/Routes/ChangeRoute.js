const express = require('express')
const router = express.Router()
const changeUser = require('../Controller/changeUser')

router.post('/changeUser/:id', changeUser.changeDetails)

router.post('/changePassword/:id', changeUser.changePassword)


module.exports = router