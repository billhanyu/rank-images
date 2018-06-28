const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const Image = mongoose.model('Image');
const sharp = require('sharp');

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Image.findById(id).exec()
    .then(image => {
      if (!image) {
        return res.sendStatus(404);
      }

      res.contentType(image.contentType);

      let data = image.data;
      const width = req.query.width || Number.MAX_SAFE_INTEGER;
      const height = req.query.height || Number.MAX_SAFE_INTEGER;
      data = sharp(data).resize(Number(width), Number(height)).max().toBuffer()
        .then(result => {
          data = result;
          res.send(data);
        })
        .catch(next);
    })
    .catch(err => {
      if (err.name === 'CastError') {
        return res.sendStatus(404);
      }
      next(err);
    });
});

module.exports = router;
