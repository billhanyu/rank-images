const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
  queueEntry: { type: mongoose.Schema.Types.ObjectId, ref: 'Queue' },
  votedFor: {
    type: Number,
    enum: [0, 1], // 0 for first, 1 for second
    default: 0,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

mongoose.model('Rating', RatingSchema);
