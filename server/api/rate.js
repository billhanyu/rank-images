const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Rating = mongoose.model('Rating');
const Queue = mongoose.model('Queue');

router.param('userid', (req, res, next, userid) => {
  User.findById(userid).populate('nextQueueEntry').exec()
    .then(found => {
      if (!found) {
        return res.status(404).send('user not found');
      }
      req.user = found;
    })
    .catch(next);
});

router.get('/:userid', (req, res, next) => {
  if (!req.user.completed) {
    return res.status(422).send('User has already completed all ratings');
  }

  if (!req.user.nextQueueEntry) {
    Queue.find({}).limit(1).exec()
      .then(entry => {
        req.user.nextQueueEntry = entry;
        res.json(entry);
        return req.user.save();
      })
      .catch(next);
  } else {
    res.json(req.user.nextQueueEntry);
  }
});

// body format
// queueEntryId: ObjectId of the queue entry rated
// votedFor: 0 for first, 1 for second
router.post('/:userid', (req, res, next) => {
  const rating = new Rating({
    user: req.user,
    queueEntry: req.body.queueEntryId,
    votedFor: req.body.votedFor,
  });
  rating.save()
    .then(() => {
      return Queue.find({ '_id': { '$gt': req.user.nextQueueEntry._id } })
        .sort('_id')
        .limit(1)
        .exec();
    })
    .then(next => {
      if (!next) {
        req.user.completed = true;
      } else {
        req.user.nextQueueEntry = next;
      }
      return req.user.save();
    })
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;
