require('dotenv').config()
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: 'eu-north-1'
});

class S3Services {

  async uploadFile (fileName, fileBody) {    
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: fileBody
    }
    try {
      return new Promise(async (resolve, reject) => {
        await s3.upload(params, (err, data) => {
          if (err) reject(err)

          resolve(data)
        })        
      })
    } catch (error) {
      console.error(error);
      if (error) {return new Error(error)}
    }
    
  }

  async deleteFile (fileName) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName
    };
    try {
      return new Promise(async (resolve, reject) => {
        s3.deleteObject(params, (err, data) => {
          if (err) reject(err)

          resolve(data)
        })
      })
      
    } catch (error) {
      console.error(error);
      if (error) {return new Error(error)}
    } 

  }


  async getFile (fileName, getFetchFile) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName
    }
    try {
      await s3.getObject(params, (err, data) => {
        getFetchFile(data)
      })
    } catch (error) {
      console.error(error);
      if (error) {return new Error(error)}
    }
  }
}

module.exports = new S3Services()

