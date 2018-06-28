const mongoose = require('mongoose');
require('../server/models/User');
const User = mongoose.model('User');

let url = process.env.MONGO_URL || 'mongodb://localhost:27017/rank';
mongoose.connect(url);

if (process.argv.length < 2) {
  console.error('Need new username to add.');
}

const name = process.argv[2];

const user = new User({
  name,
});

user.save()
  .then(saved => {
    console.log('new user saved');
    console.log(saved);
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
