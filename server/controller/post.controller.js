const db = require('../services/db')

const imagemin = require('../services/imagemin')
const sharp = require('sharp')
const sizeOf = require('image-size')

const GoogleDrive = require('../services/GoogleDrive')
const { randomId, postDate } = require('../utilits/utilits')

class postController {

  async #addImagesToGoogleDrive(images, uncompImages) {
    try {
      return new Promise(async (resolve) => {
        const imagesUrl = []
        const mimeImg = {
          gif: 'image/gif',
          jpg: 'image/jpeg',
          jpeg: 'image/jpeg',
          png: 'image/png',
          svg: 'image/svg+xml',
        }

        for (let i = 0; i < images.length; i++) {
          const splitedFile = uncompImages[i].name.toLowerCase().split('.')
          const fileType = splitedFile[splitedFile.length-1]
          const name = `${randomId()}.${fileType}`.toLowerCase()

          const imgFile = await GoogleDrive.uploadFile(`post/img/${name}`, images[i], mimeImg[fileType])
          const imgUrl = `${process.env.API_URL}/api/file/post/img/${imgFile.id}.${fileType}`
          imagesUrl.push(imgUrl)
        }
        resolve({ imagesUrl })
      })
    } catch (error) {
      console.error(error)
      return new Error(error)
    }
  }


  async #addPostDataInDB(userId, textBody) {
    try {
      const newPost = await db.query(
        `INSERT INTO post(created_by_id, user_id, text) VALUES ($1, $2, $3) RETURNING *`,
          [userId, userId, textBody]
        )
      return newPost
    } catch (err) {
      console.error(err)
      return new Error(err)
    }
  }

  async #addPostImagesInDB(postId, imagesUrls) {
    try {
      imagesUrls.forEach(async (image) => {
        await db.query(
          `INSERT INTO post_img(post_id, image) VALUES ($1, $2) RETURNING *`,
            [postId, image]
          )
      })
    } catch (err) {
      console.error(err)
      return new Error(err)
    }
  }

  async #resizePhoto(bufferImg, width, height) {
    try {
      return new Promise(async (resolve) => {
        await sharp(bufferImg)
          .resize(width, height)
          .toBuffer()
          .then( data => {
            resolve(data)
          })
      })
    } catch (error) {
      console.log(error);
    }
  }

  async #toImagePost(bufferImg) {
    try {
      const SIZE_TRIGER_IMG = 1280
      const lesserSize = 40
      const secondarySize = 640
      const dimensions = sizeOf(bufferImg)

      const minifizeAndResize = async (bufferImgToModify, width, height) => {
        const fileMin = await imagemin.minifizeImg(bufferImgToModify, 80)
        return await this.#resizePhoto(fileMin, width, height)
      }

      return new Promise(async (resolve, reject) => {
        if (dimensions.width < lesserSize || dimensions.height < lesserSize) {
          reject('inappropriate noone of size')
        }

        if(dimensions.height === dimensions.width && dimensions.width > secondarySize) {
          resolve(await minifizeAndResize(bufferImg, secondarySize, secondarySize))
        }

        const lesserSide = Math.min(dimensions.width, dimensions.height)
        const wideSide = Math.max(dimensions.width, dimensions.height)

        if (wideSide > SIZE_TRIGER_IMG) {
          const coefficient = wideSide / SIZE_TRIGER_IMG
          const sideToMini = Math.floor(lesserSide / coefficient)

          if(wideSide === dimensions.width) {
            resolve(await minifizeAndResize(bufferImg, SIZE_TRIGER_IMG, sideToMini)) 
          }
          else {
            resolve(await minifizeAndResize(bufferImg, sideToMini, SIZE_TRIGER_IMG))
          }
        } else {
          resolve(await minifizeAndResize(bufferImg, dimensions.width, dimensions.height))
        }
      })
    } catch (error) {
      console.log(error);
    }
  }


  async addNewPostUser(req, res) {
    if (req.session.idUserSession) {
      try {
        const userId = req.session.idUserSession

        const files = req.files || null
        const textBody = req.body ? req.body.textBody : ''
        let compresedImage = []
        
        if (files) {
          for (let i = 0; i < Object.values(files).length; i++) {
            const element = files[`file${i}`]
            compresedImage.push(await this.#toImagePost(element.data))
          }

          Promise.all(compresedImage).then(async (images) => {
            const { imagesUrl } = await this.#addImagesToGoogleDrive(images, Object.values(files))
            const addedPost = await this.#addPostDataInDB(userId, textBody)
            const postId = addedPost.rows[0].post_id
            await this.#addPostImagesInDB(postId, imagesUrl)
            
            await this.#getOnePostUserInDB(postId, userId)
              .then(getPost => {
                res.json(getPost)
              })
          })
        } else {
          const addedPost = await this.#addPostDataInDB(userId, textBody)
          const postId = addedPost.rows[0].post_id

          await this.#getOnePostUserInDB(postId, userId)
            .then(getPost => {
              res.json(getPost)
            })
        }
      } catch (err) {
        console.error(err);
        res.status(500).end()
        return new Error(err)
      }
    } else {
      res.status(403).end()
    }
  }



  async #getDataToPostInDB(postId, userId, sessionId) {
    try {
      const imagesFromPost = await this.#getImagesFromPostDB(postId)
      const arrayImages = this.#returnImagesArray(imagesFromPost.rows)

      const likesCount = await this.#countLikesPostFromDB(postId)

      const selfLikeToPost = await this.#selfLikeToPostFromDB(postId, sessionId)

      const commentsFromPost = await this.#getLimitCommentsPostFromDB(postId)
      const commentsArray = await this.#returnCommentsArray(commentsFromPost.rows)

      return {
        arrayImages,
        likesCount,
        commentsArray,
        selfLikeToPost
      }
    } catch (error) {
      console.error(error)
      return new Error(error)
    }
  }

  async #getOnePostUserInDB(postId, userId) {
    try {
      const post =  await db.query(
        `SELECT u.name, u.surname, u.profile_mini_img, p.post_id, p.likes_count, p.date, p.text FROM post p
        LEFT JOIN users u ON p.post_id = $1
        WHERE u.id = p.user_id`,
          [postId]
      )

      const commentAndLikesAndImagesData = await this.#getDataToPostInDB(postId, userId)
      
      const postAndUserData = post.rows[0]

      return {
        name: `${postAndUserData.name} ${postAndUserData.surname}`,
        profileImg: postAndUserData.profile_mini_img,
        date: postAndUserData.date,
        heartCount: commentAndLikesAndImagesData.likesCount.rows[0].count,
        bodyText: postAndUserData.text,
        images: commentAndLikesAndImagesData.arrayImages,
        commentData: commentAndLikesAndImagesData.commentsArray,
        selfLike: postAndUserData.selfLikeToPost,
        postId: postId,
        moreComments: commentAndLikesAndImagesData.commentsArray.length >= 3 ? true : false
      }
    } catch (err) {
      console.error(err)
      return new Error(err)
    }
  }

  async #selfLikeToPostFromDB(postId, userId) {
    try {
      const hasLikes =await db.query(
        `SELECT pl.user_id FROM post_likes pl
        WHERE pl.user_id = $1 AND pl.post_id = $2`,
        [userId, postId]
        )

        if (hasLikes.rows.length) {
          return true
        } else {
          return false
        }
    } catch (err) {
      console.error(err)
      return new Error(err)
    }
  }

  async #getUserPostsFromDB(userId, countPosts) {
    try {
      const countLimitPosts = 10
      return await db.query(
        `SELECT u.name, u.surname, u.profile_mini_img, p.post_id, p.likes_count, p.date, p.text FROM post p
        LEFT JOIN users u ON p.user_id = $1
        WHERE u.id = p.user_id
        ORDER BY p.date DESC
        LIMIT $2 OFFSET $3`,
          [userId, countLimitPosts, countPosts - countLimitPosts]
        )
    } catch (err) {
      console.error(err)
      return new Error(err)
    }
  }


  async #getImagesFromPostDB(postId) {
    try {
      return await db.query(
        `SELECT pi.image, p.post_id, p.date, pi.post_id FROM post_img pi
        LEFT JOIN post p ON p.post_id = $1
        WHERE p.post_id = pi.post_id`,
          [postId]
        )
    } catch (err) {
      console.error(err)
      return new Error(err)
    }
  }

  async #getLimitCommentsPostFromDB(postID) {
    try {
      return await db.query(
        `SELECT u.name, u.surname, u.profile_mini_img, u.id, c.date_created, c.text FROM comments c
        LEFT JOIN users u ON c.user_id = u.id
            LEFT JOIN post p ON p.post_id = $1
            WHERE p.post_id = c.post_id
            ORDER BY c.date_created ASC
            LIMIT 3`,
          [postID]
        )
    } catch (err) {
      console.error(err)
      return new Error(err)
    }
  }

  async #countLikesPostFromDB(postId) {
    try {
      return await db.query(
        `SELECT COUNT(pl.post_id) FROM post_likes pl
        LEFT JOIN post p ON p.post_id = $1
        WHERE p.post_id = pl.post_id`,
          [postId]
        )
    } catch (err) {
      console.error(err)
      return new Error(err)
    }
  }

  async #totalCountPostsUserInDB(userId) {
    try {
      return await db.query(
        `SELECT COUNT(p.post_id) FROM post p
        LEFT JOIN users u ON p.user_id = $1
        WHERE u.id = p.user_id`,
          [userId]
        )
    } catch (err) {
      console.error(err)
      return new Error(err)
    }
  }

  #returnImagesArray(imagesArray) {
    if(imagesArray.length) {
      return imagesArray.map(item => {
        return item.image
      })
    } else {
      return imagesArray
    }
  }

  #returnCommentsArray(commentsArray) {
    if(commentsArray.length) {
      return commentsArray.map(comment => {
        return {
          profileImg: comment.profile_mini_img,
          bodyText: comment.text,
          name: `${comment.name} ${comment.surname}`,
          date: comment.date_created,
          userId: comment.id
        }
      })
    } else {
      return commentsArray
    }
  }

  async getPostsUser(req, res) {
    try {
      const userId = +req.params.id
      const sessionId = +req.session.idUserSession
      const currentPage = +req.query.page
      let postData

      console.log(userId, sessionId, currentPage);
      if (Number.isInteger(userId) 
        && Number.isInteger(currentPage) 
        && currentPage >= 1) 
      {
        const countPosts = currentPage * 10
        const userPostsFromDB = await this.#getUserPostsFromDB(userId, countPosts)
        

        if (userPostsFromDB.rows.length) {

          const userPosts = userPostsFromDB.rows.map(async (post) => {
            const postId = post.post_id

            if (sessionId)
              postData = await this.#getDataToPostInDB(postId, userId, sessionId)
            else
              postData = await this.#getDataToPostInDB(postId, userId, userId)
              
            return {
              name: `${post.name} ${post.surname}`,
              profileImg: post.profile_mini_img,
              date: post.date,
              heartCount: postData.likesCount.rows[0].count,
              bodyText: post.text,
              images: postData.arrayImages,
              commentData: postData.commentsArray,
              selfLike: postData.selfLikeToPost,
              postId: postId,
              moreComments: postData.commentsArray.length >= 3 ? true : false
            }
          })

          const totalCountPosts = await this.#totalCountPostsUserInDB(userId)

          Promise.all(userPosts).then(posts => {
            res.header('Access-Control-Expose-Headers', 'X-Total-Count')
            res.set("x-total-count", totalCountPosts.rows[0].count)
            res.json(posts)
          })
        } else {
          res.json({err: 'not found', posts: []})
        }
      } else {
        res.json({err: 'incorect user id'})
      }
    } catch (err) {
      console.log(err);
      res.status(500).end()
      return new Error(err)
    }
  }

  async #addLikeToPostInDB(postId, userId) {
    try {
      return await db.query(`INSERT INTO post_likes(post_id, user_id)
      VALUES ($1, $2)`,
      [postId, userId])
    } catch (error) {
      console.error(error)
      return new Error(error)
    }
  }

  async likePosts(req, res) {
    if (req.session.idUserSession) {
      try {
        const userId = +req.session.idUserSession
        const postId = +req.params.postId

        await this.#addLikeToPostInDB(postId, userId)

        res.json({postId, likeActive: true})
      } catch (err) {
        console.error(err);
        res.status(500).end()
        return new Error(err)
      }
    } else {
      res.status(403).end()
    }
  }

  async #removeLikeToPostInDB(postId, userId) {
    try {
      return await db.query(`DELETE FROM post_likes
      WHERE post_id = $1 AND user_id = $2`,
      [postId, userId])
    } catch (error) {
      console.error(error)
      return new Error(error)
    }
  }

  async unlikePosts(req, res) {
    if (req.session.idUserSession) {
      try {
        const userId = +req.session.idUserSession
        const postId = +req.params.postId

        await this.#removeLikeToPostInDB(postId, userId)

        res.json({postId, likeActive: false})
      } catch (err) {
        console.error(err);
        res.status(500).end()
        return new Error(err)
      }
    } else {
      res.status(403).end()
    }
  }

  async #addNewCommentToPostInDB(postId, userId, text) {
    try {
      return await db.query(`INSERT INTO comments(post_id, user_id, text) 
      VALUES ($1, $2, $3);`,
      [postId, userId, text])
    } catch (error) {
      console.error(error)
      return new Error(error)
    }
  }

  async #getLustCommentToPostInDB(postId) {
    try {
      return await db.query(`SELECT u.name, u.surname, u.id, u.profile_mini_img, c.date_created, c.text FROM comments c
      LEFT JOIN users u ON c.user_id = u.id
          LEFT JOIN post p ON p.post_id = $1
          WHERE p.post_id = c.post_id
          ORDER BY c.c_id DESC LIMIT 1`,
      [postId])
    } catch (error) {
      console.error(error)
      return new Error(error)
    }
  }

  async commentToPost(req, res) {
    if (req.session.idUserSession) {
      try {
        const userId = +req.session.idUserSession
        const postId = +req.params.postId
        const bodyComment = req.body.commentData || null
        
        if (bodyComment) {
          await this.#addNewCommentToPostInDB(postId, userId, bodyComment)
          const getComment = await this.#getLustCommentToPostInDB(postId)
          const currentCom = getComment.rows[0]
          
          const comment = {
            profileImg: currentCom.profile_mini_img,
            bodyText: currentCom.text,
            name: `${currentCom.name} ${currentCom.surname}`,
            date: currentCom.date_created,
            userId: currentCom.id
          }

          res.json({comment, postId})
        } else {
          res.status(400).end()
        }
      } catch (err) {
        console.error(err);
        res.status(500).end()
        return new Error(err)
      }
    } else {
      res.status(403).end()
    }
  }

  async getFullCommentsPostFromDB(req, res) {
    try {
      const postId = +req.params.postId
      
      if (Number.isInteger(postId)) {
        const moreComments = await db.query(
          `SELECT u.name, u.surname, u.profile_mini_img, u.id, c.date_created, c.text FROM comments c
          LEFT JOIN users u ON c.user_id = u.id
              LEFT JOIN post p ON p.post_id = $1
              WHERE p.post_id = c.post_id
              ORDER BY c.date_created ASC`,
            [postId]
        )

        const getComment = this.#returnCommentsArray(moreComments.rows)

        res.json({getComment, postId})
      } else {
        res.status(400).end()
      }
    } catch (err) {
      console.error(err);
      res.status(500).end()
      return new Error(err)
    }
  }

}

module.exports = new postController()