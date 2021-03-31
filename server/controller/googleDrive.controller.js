const GoogleDrive = require('../services/GoogleDrive')

class googleDriveController {

  async getFileGoogleDrive(req, res, path) {
    const mimeImg = {
      gif: 'image/gif',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      svg: 'image/svg+xml',
    }
    
    let fileId = null

    if (path === 'pimg') {
      if(req.params.id.includes('mini_')) {
        fileId = req.params.id.substr(5).split('.')[0]
      } else {
        fileId = req.params.id.split('.')[0]
      }
    } else if (path === 'post/img') {
      fileId = req.params.id.split('.')[0]
    }
    
    const data = await GoogleDrive.getFile(fileId)

    if (data) {
      try {
        const typeMime = mimeImg[req.params.id.toLowerCase().split('.')[1]]
        res.writeHead(200, {'Content-Type': typeMime })
        res.end(data, 'binary')

      } catch (err) {
        console.error(err)
        res.status(500).end()
        return new Error(err)
      }
    } else {
      res.status(404).end()
    }
    
  }

  async getProfileImg(req, res) {
    try {
      await this.getFileGoogleDrive(req, res, 'pimg')      
    } catch (err) {
      console.error(err)
      res.status(500).end()
      return new Error(err)
    }
  }

  async getPostImg(req, res) {
    try {
      await this.getFileGoogleDrive(req, res, 'post/img')
    } catch (err) {
      console.error(err)
      res.status(500).end()
      return new Error(err)
    }
  }
}

module.exports = new googleDriveController()