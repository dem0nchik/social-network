const Router = require('express');
const infoController = require('../controller/info.controller') 
const router = new Router()

router.get('/info/user', infoController.getListUsers.bind(infoController))


module.exports = router