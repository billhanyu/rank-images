const mongoose = require('mongoose');
require('../server/models/Image');
const Image = mongoose.model('Image');
const fs = require('fs');
const path = require('path');

let url = process.env.MONGO_URL || 'mongodb://localhost:27017/rank';
mongoose.connect(url);

const ALLOWED_EXTENSIONS = ['png', 'jpg', 'gif', 'jpeg'];

if (process.argv.length < 2) {
  console.error('Need folder path that\'s storing the images.');
}

const folderPath = process.argv[2];

const files = fs.readdirSync(folderPath);
const savePromises = [];

files.forEach(filename => {
  const splitArr = filename.split('.');
  const extension = splitArr.pop().toLowerCase();

  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return;
  }

  const image = new Image({
    data: fs.readFileSync(path.join(folderPath, filename)),
    contentType: `image/${extension}`,
  });
  savePromises.push(image.save());
});

Promise.all(savePromises)
  .then(() => {
    console.log('saved all iamges');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
