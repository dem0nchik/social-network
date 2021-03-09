require('dotenv').config()
const db = require('../services/db')
const S3Services = require('../services/S3')

const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

const { randomId } = require('../utilits/utilits')


const _checkExistsUserImg = async (id) => {
  try {
    return await db.query(`SELECT profile_img FROM users WHERE id = $1`, [id])
  } catch (err) {
    console.error(err);
    return new Error(err)
  }
}
const _addUserImgInDB = async (imgUrl, id) => {
  try {
    return await db.query(`UPDATE users SET profile_img = $1 WHERE id = $2`, [imgUrl, id])
  } catch (err) {
    console.error(err);
    return new Error(err)
  }
}
const _deleteUserImgS3 = async (img, fetchDeleteFile) => {
  try {
    await S3Services.deleteFile(img, fetchDeleteFile)
  } catch (err) {
    console.error(err);
    return new Error(err)
  }
}

class UserController {
  constructor() {}

  async getDataUser(req, res) {
    if (req.session.idUserSession) {
      try {
        const dataUserInDB = await db.query(`SELECT * FROM users WHERE id = $1`, [req.session.idUserSession])
        const user = dataUserInDB.rows[0]

        res.json({
          id: user.id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          data_created: user.data_create,
          profile_img: user.profile_img
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
      
      try {
        let isImgUpdate = false

        const fileMin = await imagemin.buffer(file.data, {
          plugins: [
            imageminMozjpeg({quality: 50}),
            imageminPngquant({
                quality: [0.6, 0.8]
            })
        ]})

        const fetchDeleteFile = async () => {
          await S3Services.uploadFile(`pimg/${name}`, fileMin, requestUploadStatus)
        }

        const userImg = await _checkExistsUserImg(userId)
        if (userImg.rows[0].profile_img === null) {
          isImgUpdate = true
        } else {
          const profileImg = userImg.rows[0].profile_img
          const imgPath = profileImg.substring(profileImg.indexOf('pimg'))
          
          await _deleteUserImgS3(imgPath, fetchDeleteFile)
        }

        const requestUploadStatus = async (data) => {
          if(data) {
            const imgUrl = `${process.env.API_URL}/api/file/pimg/${name}`
            await _addUserImgInDB(imgUrl, userId)
            
            res.json({ profile_img: imgUrl })
          }
        }

        if (isImgUpdate) {
          await S3Services.uploadFile(`pimg/${name}`, fileMin, requestUploadStatus)
        }
      } catch (error) {
        console.error(error);
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
      const imgPath = profileImg.substring(profileImg.indexOf('pimg'))
      
      
      const fetchDeleteFile = async () => {
        await _addUserImgInDB(null, userId)

        res.json({ profile_img: null })
      }
      
      await _deleteUserImgS3(imgPath, fetchDeleteFile)
    } catch (error) {
      console.error(error);
      res.status(500).end()
      return new Error(error)       
    }
  }
}

module.exports = new UserController()