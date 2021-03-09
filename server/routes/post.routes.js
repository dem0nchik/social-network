const Router = require('express');
const postController = require('../controller/post.controller') 
const router = new Router()

router.post('/post/add/user', postController.addNewPostUser.bind(postController))
router.get('/post/user/:id', postController.getPostsUser.bind(postController))
router.post('/post/like/:postId', postController.likePosts.bind(postController))
router.post('/post/unlike/:postId', postController.unlikePosts.bind(postController))
router.post('/post/comment/:postId', postController.commentToPost.bind(postController))
router.post('/post/comment/more/:postId', postController.getFullCommentsPostFromDB.bind(postController))


module.exports = router