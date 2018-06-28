const mongoose = require('mongoose');

const QueueSchema = new mongoose.Schema({
  first: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
  second: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
});

mongoose.model('Queue', QueueSchema);
