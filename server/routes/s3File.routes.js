const Router = require('express');
const s3FileController = require('../controller/s3File.controller') 
const router = new Router()

router.get('/file/pimg/:id', s3FileController.getProfileImg.bind(s3FileController))
router.get('/file/post/img/:id', s3FileController.getPostImg.bind(s3FileController))

module.exports = router