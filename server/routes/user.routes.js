const Router = require('express');
const userController = require('../controller/user.controller') 
const router = new Router()

router.get('/user', userController.getDataUser)
router.post('/user/pimg', userController.putNewImgUser)
router.delete('/user/pimg', userController.deleteImgUser)


module.exports = router