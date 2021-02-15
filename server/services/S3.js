require('dotenv').config()
const fs = require('fs');
const http = require('http')
const url  = require("url");
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: 'eu-north-1'
});

const uploadFile = (fileName) => {
  const fileContent = fs.readFileSync('photo5420225616789222418.jpg');
  console.log(fileContent);
  const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: 'img/photo5420225616789222418.jpg',
      Body: fileContent
  };

  s3.upload(params, function(err, data) {
      if (err) {throw err;}
      console.log(`File uploaded successfully. ${data.Location}`);
  });
};

const deleteFile = (fileName) => {
  var params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName
  };
  
  s3.deleteObject(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });

}



http.createServer(function(req, res){
  var request = url.parse(req.url, true);
  var action = request.pathname;
  
  if (action === '/img/photo5420225616789222418.jpg') {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: 'img/photo5420225616789222418.jpg'
    }
    s3.getObject(params, function(err, data) {
        if (err) {
            throw err
        }
        console.log(data);
        res.writeHead(200, {'Content-Type': data.ContentType });
        res.end(data.Body);
    })
  } else { 
     res.writeHead(200, {'Content-Type': 'text/plain' });
     res.end('Hello World \n');
  }
}).listen(8080, '127.0.0.1');


uploadFile()
// deleteFile('t1.jpg')