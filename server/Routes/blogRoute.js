const express = require('express')
const router = express.Router()
const blogController = require('../Controller/blogController')


router.get('/getAll', blogController.getAllBlog)

router.get('/getOneBlog/:id', blogController.getOneBlog)

router.post('/postBlog', blogController.postOneBlog)

router.patch('/updateBlog', blogController.updateBlog)

router.delete('/deleteBlog/:id', blogController.deleteBlog)



module.exports = router