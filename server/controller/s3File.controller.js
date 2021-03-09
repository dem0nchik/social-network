const S3Services = require('../services/S3')

class s3FileController {

  async getFileS3(req, res, path) {
    const mimeImg = {
      gif: 'image/gif',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      svg: 'image/svg+xml',
    }
    
    const getAndSendFile = (data) => {
      if (data) {
        try {
          const typeMime = mimeImg[req.params.id.split('.')[1]]
          res.writeHead(200, {'Content-Type': typeMime })
          res.end(data.Body, 'binary')

        } catch (err) {
          console.error(err)
          res.status(500).end()
          return new Error(err)
        }
      } else {
        res.status(404).end()
      }
    
    }
    
    await S3Services.getFile(`${path}/${req.params.id}`, getAndSendFile)
  }

  async getProfileImg(req, res) {
    try {
      await this.getFileS3(req, res, 'pimg')      
    } catch (err) {
      console.error(err)
      res.status(500).end()
      return new Error(err)
    }
  }

  async getPostImg(req, res) {
    try {
      await this.getFileS3(req, res, 'post/img')
    } catch (err) {
      console.error(err)
      res.status(500).end()
      return new Error(err)
    }
  }
}

module.exports = new s3FileController()