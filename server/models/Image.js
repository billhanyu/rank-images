const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
  votes: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

ImageSchema.methods.toJson = function() {
  return {
    votes: this.votes,
    id: this._id,
  };
};

mongoose.model('Image', ImageSchema);
