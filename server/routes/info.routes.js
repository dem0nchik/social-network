const Router = require('express');
const infoController = require('../controller/info.controller') 
const router = new Router()

router.get('/info/user', infoController.getListUsers.bind(infoController))
router.get('/info/user/all', infoController.getAllListUsers.bind(infoController))

router.post('/info/user/images', infoController.getUserImages.bind(infoController))


module.exports = router