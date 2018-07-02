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
      next();
    })
    .catch(next);
});

router.get('/:userid', (req, res, next) => {
  if (req.user.completed) {
    return res.status(422).send('User has already completed all ratings');
  }

  let entry;
  if (!req.user.nextQueueEntry) {
    Queue.find({}).sort('_id').limit(1).exec()
      .then(found => {
        entry = found[0];
        req.user.nextQueueEntry = entry;
        return req.user.save();
      })
      .then(() => res.json(entry))
      .catch(next);
  } else {
    res.json({
      username: req.user.name,
      queue: req.user.nextQueueEntry,
    });
  }
});

// body format
// queueEntryId: ObjectId of the queue entry rated
// votedFor: 0 for first, 1 for second
router.post('/:userid', (req, res, next) => {
  if (req.body.queueEntryId !== req.user.nextQueueEntry._id.toString()) {
    return res.status(422).send('not rating the expected pair.');
  }

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
      if (next.length < 1) {
        req.user.completed = true;
      } else {
        req.user.nextQueueEntry = next[0];
      }
      return req.user.save();
    })
    .then(() => {
      return Queue.findById(req.body.queueEntryId)
        .populate('first')
        .populate('second')
        .exec();
    })
    .then(queue => {
      if (req.body.votedFor === 0) {
        queue.first.votes++;
        return queue.first.save();
      } else {
        queue.second.votes++;
        return queue.second.save();
      }
    })
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;
