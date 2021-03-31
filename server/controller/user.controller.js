require('dotenv').config()
const db = require('../services/db')
const GoogleDrive = require('../services/GoogleDrive')

const imagemin = require('../services/imagemin')
const sharp = require('sharp')
const sizeOf = require('image-size')

const { randomId } = require('../utilits/utilits')


const _checkExistsUserImg = async (id) => {
  try {
    return await db.query(`SELECT profile_img, profile_mini_img FROM users WHERE id = $1`, [id])
  } catch (err) {
    console.error(err);
    return new Error(err)
  }
}
const _addUserImgInDB = async (imgUrl, imgMiniUrl, id) => {
  try {
    return await db.query(`UPDATE users 
      SET profile_img = $1, profile_mini_img = $2
      WHERE id = $3`, [imgUrl, imgMiniUrl, id])
  } catch (err) {
    console.error(err);
    return new Error(err)
  }
}

class UserController {
  async #getLimitFriendsUserFromDB(userId) {
    try {
      return await db.query(
        `SELECT u.profile_mini_img, u.name, u.surname, u.id FROM friend_people fp
          INNER JOIN friends f ON f.f_id = fp.f_id
          INNER JOIN users u ON fp.friend = u.id
          WHERE f.user_id = $1
          ORDER BY fp.f_id ASC
          LIMIT 6`,
          [userId]
        )
    } catch (err) {
      console.error(err)
      return new Error(err)
    }
  }

  async #totalCountFriendsUserInDB(userId) {
    try {
      return await db.query(
        `SELECT COUNT(fp.f_id) FROM friend_people fp
        LEFT JOIN friends f ON f.f_id = fp.f_id
        WHERE f.user_id = $1`,
          [userId]
        )
    } catch (err) {
      console.error(err)
      return new Error(err)
    }
  }

  #returnFriendsListArray(friendsArray) {
    if(friendsArray.length) {
      return friendsArray.map(friend => {
        return {
          profileImg: friend.profile_mini_img,
          name: `${friend.name} ${friend.surname}`,
          link: `/id${friend.id}`
        }
      })
    } else {
      return friendsArray
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

  async #toImageProfile(bufferImg, requiredSizeImage) {
    try {
      const SIZE_MINI_IMG = 40
      const dimensions = sizeOf(bufferImg)

      return new Promise(async (resolve, reject) => {
        if (dimensions.width < SIZE_MINI_IMG || dimensions.height < SIZE_MINI_IMG) {
          reject('inappropriate noone of size')
        }

        const lesserSide = Math.min(dimensions.width, dimensions.height)
        const wideSide = Math.max(dimensions.width, dimensions.height)
  
        const coefficient = lesserSide / requiredSizeImage
        const sideToMini = Math.floor(wideSide / coefficient)
  
        if(wideSide === dimensions.width) {
          const fileMin = await imagemin.minifizeImg(bufferImg, 100)
          resolve(await this.#resizePhoto(fileMin, requiredSizeImage, sideToMini))          
        }
        else {
          const fileMin = await imagemin.minifizeImg(bufferImg, 100)
          resolve(await this.#resizePhoto(fileMin, sideToMini, requiredSizeImage))
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  async getDataUser(req, res) {
    if (req.session.idUserSession) {
      try {
        const dataUserInDB = await db.query(`SELECT * FROM users WHERE id = $1`, [req.session.idUserSession])
        const user = dataUserInDB.rows[0]

        const getAllFriends = await this.#getLimitFriendsUserFromDB(req.session.idUserSession)
        const countFriends = await this.#totalCountFriendsUserInDB(req.session.idUserSession)

        res.json({
          id: user.id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          data_created: user.data_create,
          profile_img: user.profile_img,
          friendList: {
            list: this.#returnFriendsListArray(getAllFriends.rows),
            count: countFriends.rows[0].count
          }
        })
      } catch (err) {
        console.error(err);
        res.status(500).end()
        return new Error(err)
      }
    } else {
      res.status(403).end()
    }
  }


  async putNewImgUser(req, res) {
    if(req.files.profileImg) {
      const file = req.files.profileImg
      const splitedFile = file.name.split('.')
      const fileType = splitedFile[splitedFile.length-1]
      const name = `${randomId()}.${fileType}`
      const userId = req.session.idUserSession
      const mimeImg = {
        gif: 'image/gif',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        svg: 'image/svg+xml',
      }
      
      try {
        let isImgUpdate = false
        
        const miniImg = await this.#toImageProfile(file.data, 40)
        const wideImage = await this.#toImageProfile(file.data, 250)

        
        const requestUploadStatus = async (imgMiniId, imgId) => {
          const imgUrl = `${process.env.API_URL}/api/file/pimg/${imgId}.${fileType}`
          const imgMiniUrl = `${process.env.API_URL}/api/file/pimg/mini_${imgMiniId}.${fileType}`
          await _addUserImgInDB(imgUrl, imgMiniUrl, userId)
          
          res.json({ profile_img: imgUrl })
        }

        const userImg = await _checkExistsUserImg(userId)
        
        if (userImg.rows[0].profile_img === null) {
          isImgUpdate = true
        } else {
          const profileImg = userImg.rows[0].profile_img
          const profileMiniImg = userImg.rows[0].profile_mini_img
          
          const fileId = profileImg.substring(profileImg.indexOf('pimg/')+'pimg/'.length).split('.')[0]
          const fileMiniId = profileMiniImg.substring(profileMiniImg.indexOf('pimg/')+'pimg/mini_'.length).split('.')[0]
          
          await GoogleDrive.deleteFile(fileId)
          await GoogleDrive.deleteFile(fileMiniId)

          const miniImgFile = await GoogleDrive.uploadFile(`pimg/mini_${name}`, miniImg, mimeImg[fileType])
          const wideImgFile = await GoogleDrive.uploadFile(`pimg/${name}`, wideImage, mimeImg[fileType])
          
          await requestUploadStatus(miniImgFile.id, wideImgFile.id)
        }

        if (isImgUpdate) {
          const miniImgFile = await GoogleDrive.uploadFile(`pimg/mini_${name}`, miniImg, mimeImg[fileType])
          const wideImgFile = await GoogleDrive.uploadFile(`pimg/${name}`, wideImage, mimeImg[fileType])
          
          await requestUploadStatus(miniImgFile.id, wideImgFile.id)
        }
      } catch (error) {
        console.error(error)
        res.status(500).end()
        return new Error(error)        
      }

    } else {
      res.status(404).end()
    }
  }

  async deleteImgUser(req, res) {
    try {
      const userId = req.session.idUserSession      
      const userImg = await _checkExistsUserImg(userId)

      const profileImg = userImg.rows[0].profile_img
      const profileMiniImg = userImg.rows[0].profile_mini_img
      
      if (!!profileImg) {
        const fileId = profileImg.substring(profileImg.indexOf('pimg/')+'pimg/'.length).split('.')[0]
        await GoogleDrive.deleteFile(fileId)
      }
      
      if (!!profileMiniImg) {
        const fileMiniId = profileMiniImg.substring(profileMiniImg.indexOf('pimg/')+'pimg/mini_'.length).split('.')[0]
        await GoogleDrive.deleteFile(fileMiniId)
      }
      
      await _addUserImgInDB(null, null, userId)

      res.json({ profile_img: null })
    } catch (error) {
      console.error(error);
      res.status(500).end()
      return new Error(error)       
    }
  }
}

module.exports = new UserController()