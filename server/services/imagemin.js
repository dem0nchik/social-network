const imagemin = require('imagemin');
const imageminJpegoptim = require('imagemin-jpegoptim');
const imageminPngquant = require('imagemin-pngquant')

const minifizeImg = async (bufferImg, quality) => {
  try {
    return await imagemin.buffer(bufferImg, {
      plugins: [
        imageminJpegoptim({progressive: true, max: quality}),
        imageminPngquant({
          quality: [0.6, 0.7]
        })
      ]})
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  minifizeImg
}