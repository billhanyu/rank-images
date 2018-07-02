const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const Image = mongoose.model('Image');

router.get('/all', (req, res, next) => {
  Image.find({}).sort({'votes': -1}).exec()
    .then(images => {
      res.json(images.map(image => image.toJson()));
    })
    .catch(next);
});

module.exports = router;
