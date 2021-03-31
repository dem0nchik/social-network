const Router = require('express');
const userController = require('../controller/user.controller') 
const router = new Router()

router.get('/user', userController.getDataUser.bind(userController))
router.post('/user/pimg', userController.putNewImgUser.bind(userController))
router.delete('/user/pimg', userController.deleteImgUser.bind(userController))


module.exports = router