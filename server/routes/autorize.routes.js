const Router = require('express');
const autorizeController = require('../controller/autorize.controller') 
const router = new Router()

//Login user
router.post('/autorize/login', autorizeController.formLoginUser.bind(autorizeController))

//Register user
router.post('/autorize/registarion', autorizeController.formCreateUser.bind(autorizeController))


//autorize in app
router.get('/autorize', autorizeController.checkAutorizeUser)

module.exports = router