const Router = require('express');
const friendController = require('../controller/friend.controller') 
const router = new Router()

router.post('/friend/all/', friendController.getFriendListToUser.bind(friendController))
router.post('/friend/all/:id', friendController.getFriendListToUserView.bind(friendController))

router.post('/friend/user/:id', friendController.newFriendToUser.bind(friendController))
router.delete('/friend/user/:id', friendController.removeFriendToUser.bind(friendController))

router.post('/friend/:id', friendController.getDataFriend.bind(friendController))

module.exports = router