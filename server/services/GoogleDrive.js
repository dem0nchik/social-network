require('dotenv').config()
const {Response} = require('node-fetch')
const {google} = require('googleapis')
const { Readable } = require('stream')


const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_DRIVE_CLIENT_ID,
  process.env.GOOGLE_DRIVE_CLIENT_SECRET,
  process.env.GOOGLE_DRIVE_REDIRECT_URI
)

oauth2Client.setCredentials({refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN})

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
})

class GoogleDrive {
  async uploadFile (fileName, fileBody, mimeType) {
    try {
      return new Promise(async (resolve) => {
        const res = await drive.files.create({
          requestBody: {
            name: fileName,
            mimeType: mimeType
          },
          media: {
            mimeType: mimeType,
            body: Readable.from(fileBody)
          }
        })
  
        resolve(res.data)
      })
    } catch (error) {
      console.error(error);
    }
  }

  async deleteFile(fileId) {
    try {
      return new Promise(async (resolve) => {
        const response = await drive.files.delete({
          fileId: fileId,
        })
        resolve(response.status)
      })
    } catch (error) {
      console.log(error.message);
    }
  }


  async getFile (fileId) {
    try {
      return new Promise(async (resolve) => {
        await drive.files.get(
          {fileId, alt: 'media'},
          {responseType: 'stream'}
        )
        .then(res => new Response(res.data).buffer())
        .then(buffer => resolve(buffer))
      })
    } catch (error) {
      console.error(error);
      if (error) {return new Error(error)}
    }
  }
}

module.exports = new GoogleDrive()