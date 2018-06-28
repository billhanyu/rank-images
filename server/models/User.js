const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nextQueueEntry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Queue',
    default: null,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

mongoose.model('User', UserSchema);
