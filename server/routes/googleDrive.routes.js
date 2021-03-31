const Router = require('express');
const googleDriveController = require('../controller/googleDrive.controller') 
const router = new Router()

router.get('/file/pimg/:id', googleDriveController.getProfileImg.bind(googleDriveController))
router.get('/file/post/img/:id', googleDriveController.getPostImg.bind(googleDriveController))

module.exports = router