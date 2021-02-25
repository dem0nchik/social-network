const Router = require('express');
const autorizeController = require('../controller/autorize.controller') 
const router = new Router()

router.post('/autorize/login', autorizeController.formLoginUser.bind(autorizeController))

router.post('/autorize/registarion', autorizeController.formCreateUser.bind(autorizeController))

router.get('/autorize/verify', autorizeController.verifyUserMail)

router.get('/autorize/logout', autorizeController.logoutUser)

router.get('/autorize', autorizeController.checkAutorizeUser)


module.exports = router