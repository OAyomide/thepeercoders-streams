const fs = require('fs').promises;
const filesystem = require('fs');

const { Writable, Transform, PassThrough } = require('stream');
const jimp = require('jimp');
const path = require('path');
const axios = require('axios');

async function transform_image(url) {
  const Jimp = await jimp.read(url)
  const transform = Jimp.resize(100, 100).grayscale()
  const buffer = await transform.getBufferAsync(jimp.MIME_PNG);
  await fs.writeFile(path.join(__dirname, 'trans.png'), buffer);
}

transform_image('https://source.unsplash.com/random');

async function _transform_image(url) {
 try {
  const response = await axios({ method: 'get', url, responseType: 'stream' });
  const to_grayscale = new To_grayscale();
 
  response.data.pipe(to_grayscale).pipe(filesystem.createWriteStream(path.join(__dirname, 'stream-trans.png')), { end: false });
 } catch (error) {
  console.log(`Error fetching image here: `, error);
 }
}


class To_grayscale extends Transform {
 constructor() {
  super();
 }

 _transform(chunk, encoding, cb) {
  jimp.read(chunk, (err, value) => {
   if (err) {
    throw err;
   }

   value.grayscale().getBuffer(jimp.MIME_PNG, (e, val) => {
    if (e) throw e;
    this.push(val)
    cb();
   });
  });
}

}


_transform_image('https://source.unsplash.com/random')