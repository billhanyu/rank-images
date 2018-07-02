const mongoose = require('mongoose');
require('../server/models/Image');
require('../server/models/Queue');
const Image = mongoose.model('Image');
const Queue = mongoose.model('Queue');
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
const saveImagePromises = [];

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
  saveImagePromises.push(image.save());
});

let savedImages;

Promise.all(saveImagePromises)
  .then(saved => {
    savedImages = saved;
    console.log('saved all iamges');

    const queues = [];

    for (let i = 0; i < savedImages.length; i++) {
      for (let j = i + 1; j < savedImages.length; j++) {
        const entry = {
          first: savedImages[i],
          second: savedImages[j],
        };
        queues.push(entry);
      }
    }
    shuffleArray(queues);
    const saveQueuePromises = queues.map(queue => new Queue(queue).save());
    return Promise.all(saveQueuePromises);
  })
  .then(() => {
    console.log('saved all queue entries');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
