const Router = require('express');
const chatController = require('../controller/chat.controller') 
const router = new Router()

router.post('/chat', chatController.handleChat.bind(chatController))
router.post('/chat/id/:chatId', chatController.getInfoChat.bind(chatController))
router.post('/chat/allchat', chatController.getChatList.bind(chatController))
router.post('/chat/newmsg', chatController.newMessage.bind(chatController))
router.post('/chat/widget', chatController.getLimitChatList.bind(chatController))
router.post('/chat/unread-count', chatController.getCountUnreadChats.bind(chatController))


module.exports = router