const Router = require('express');
const autorizeController = require('../controller/autorize.controller') 
const router = new Router()

//Login user
router.post('/autorize/login', autorizeController.formLoginUser.bind(autorizeController))

//Register user
router.post('/autorize/registarion', autorizeController.formCreateUser.bind(autorizeController))

//verify user mail
router.get('/autorize/verify', autorizeController.verifyUserMail)

//logout user
router.get('/autorize/logout', autorizeController.logoutUser)

//chek autorize in app
router.get('/autorize', autorizeController.checkAutorizeUser)


module.exports = router